import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) => 
        set(produce((store) => {
            store.tasks.push({ title, state })
        })),
    deleteTask: (title) => 
        set((store) => 
            ({ tasks: store.tasks.filter(task => task.title !== title) }),
            false,
            "deleteTask"
        ),
    setDraggedTask: (title) => set({ draggedTask: title }),
    moveTask: (title, state) => set(store => ({
        tasks: store.tasks.map((task) => 
            task.title === title ? { title, state } : task
        )
    }))
});

const log = (config) => (set, get, api) => 
    config(
        (...args) => {
            console.log(args);
            set(...args);
        },
        get,
        api
    )

export const useStore = create(
    subscribeWithSelector(log(persist(devtools(store), { name: "store" })))
);

useStore.subscribe(
    (store) => store.tasks,
    (newTask, prevTask) => {
        useStore.setState({
            tasksInOngoing: newTask.filter((task) => task.state === "ONGOING")
                .length
        })
    }
);