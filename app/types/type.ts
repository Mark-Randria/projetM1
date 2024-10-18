export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser extends IUserLogin {
  nom: string;
  prenom: string;
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
  critiques: any;
}

export interface IAuteur extends IUser {
  id: number;
}
