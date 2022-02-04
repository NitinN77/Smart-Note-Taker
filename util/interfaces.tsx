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
    activeNote: any;
    onUpdateNote: (updatedNote: Note) => Note | void;
}

export interface AppContextInterface {
    state:{
        notes: SideNotes["notes"];
        activeNote: any;
    }
    setNotes: Function;
    onAddNote: () => void;
    setActiveNote: React.Dispatch<React.SetStateAction<number | undefined>>;
    onUpdateNote: (updatedNote: Note) => Note | void;
    onDeleteNote: (idToDelete: number) => void;
    getActiveNote: Function;
    writeNote: Function;
}