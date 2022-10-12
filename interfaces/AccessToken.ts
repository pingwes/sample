export default interface AccessToken {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["user", "me"];
    "x-hasura-default-role": "user";
    "x-hasura-user-id": "27a679d0-1dd1-46f7-8ba2-c188ed056cd9";
    "x-hasura-user-is-anonymous": "false";
  };
  sub: "27a679d0-1dd1-46f7-8ba2-c188ed056cd9";
  iat: 1664680666;
  exp: 1664681566;
  iss: "hasura-auth";
}
