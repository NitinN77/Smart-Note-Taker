export interface Note {
    id: number;
    title: string;
    body?: string;
    lastModified: number;
}

export interface Notes {
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