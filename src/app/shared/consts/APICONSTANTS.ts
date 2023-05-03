import { environment } from "src/environments/environment";

export const APICONSTANTS = {
  Token: environment.token,
  organization: "Angular",
  pageSize: 100,
  base: 'https://api.github.com',
  reposUrl: '/orgs/angular/repos',
  baseNameIndex: 4,
  repoNameIndex: 5
}
