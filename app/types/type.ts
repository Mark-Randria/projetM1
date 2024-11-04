export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  nom: string;
  prenom: string;
  isAdmin: string;
}

export interface IArticle {
  id: number;
  titreArticle: string;
  contenu: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  archive: boolean;
  datePubArticle: Date;
  auteurId: number;
  auteur: IAuteur;
  pdfPath: string;
  critiques: ICritique[];
}

export interface ICritique {
  id: number;
  datePubCritique: Date;
  reviewerId: number;
  articleId: number;
  titreCritique: string;
  descriptionCritique: string;
  Article: IArticle;
  reviewer: IAuteur;
}

export interface IAuteur extends IUser {
  id: number;
}

export interface IToken {
  user: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    motdepasse: string;
    isAdmin: boolean;
  };
}
