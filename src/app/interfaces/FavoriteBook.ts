
export interface FavoriteBook{
    id: number;
    bookModelDto:BookModelDto
}

export interface BookModelDto {
    id:         number;
    name:       string;
    nameAuthor: string;
    editorial:  string;
    synopsis:   string;
    genre:      string;
    image:      string;
}