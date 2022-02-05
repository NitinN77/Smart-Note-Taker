import { Dispatch, SetStateAction } from "react";

export interface Note {
    id: number;
    title: string;
    body?: string;
    lastModified: number;
}

export interface SideNotes {
    notes: Note[]
    onAddNote: () => void;
    onDeleteNote: (idToDelete: number) => void;
    activeNote: number | undefined;
    setActiveNote: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export interface MainNote {
    activeNote: Note | undefined;
    onUpdateNote: (updatedNote: Note) => Note | void;
}

export interface AppContextInterface {
    state: {
        notes: Note[];
        activeNote: Note | undefined;
    }
    setNotes: Dispatch<SetStateAction<Note[]>>;
    onAddNote: () => void;
    setActiveNote: React.Dispatch<React.SetStateAction<number | undefined>>;
    onUpdateNote: (updatedNote: Note) => Note | void;
    onDeleteNote: (idToDelete: number) => void;
    getActiveNote: () => Note | undefined;
    writeNote: (note: Note) => Promise<void>;
}