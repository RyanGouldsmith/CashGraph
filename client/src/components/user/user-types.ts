interface UserResult {
  user: {
    name: string;
    id: string;
    email: string;
  };
}

export interface UserQueryResult {
  loading: boolean;
  data: UserResult;
}
