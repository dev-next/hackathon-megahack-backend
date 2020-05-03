const { gql } = require('apollo-server-express');
const FindUser = require('../../../domain/use-cases/user/find-user/FindUser');

const typeDefs = gql`
  type SysAction {
    id: ID
    isValid: Boolean
    requester: User
    hash: String
    action: _SysActionActionEnum
    metadata: String
    expirationDate: DateTime
    creationDate: DateTime
    active: Boolean
  }
  
  input SysActionInput {
    requester: ID
    hash: String
    action: _SysActionActionEnum
    metadata: String
    expirationDate: String
    active: Boolean
  }
  
  enum _SysActionActionEnum {
    FORGOT_PASS
    FINISH_ACCOUNT
    INVITE_USER
  }
`;

const resolvers = {
  SysAction: {
    id: root => root._id || root.id,

    requester: (
      root,
      data,
      {
        UserLogged,
        db: { UserPersistentModel },
      }
    ) => {
      if (root.requester) {
        return FindUser({
          userId: root.requester,
        }, { UserLogged, UserPersistentModel });
      }

      return {};
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
