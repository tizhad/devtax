/* eslint-disable */
import {TypedDocumentNode} from "@graphql-typed-document-node/core";
import {gql} from "@apollo/client";

const documents: Record<string, TypedDocumentNode<any, any>> = {};

documents['GetAllJourneys'] = gql`
  query GetAllJourneys {
    journeyCollection {
      edges {
        node {
          id
          from_address
          to_address
          fare
          inbound
          created_at
          status
          traveller_info {
            id
            first_name
            last_name
            flight_number
            passenger_count
            phone_number
          }
        }
      }
    }
  }
`;

documents['GetAllDrivers'] = gql`
  query GetAllDrivers {
    journeyCollection {
      edges {
        node {
          id
          from_address
          to_address
          fare
          inbound
          created_at
          traveller_info {
            id
            first_name
            last_name
            flight_number
            passenger_count
            phone_number
          }
        }
      }
    }
  }
`;

documents['GetDriverInfo'] = gql`
  {
    user_infoCollection {
      edges {
        node {
          name
          email
        }
      }
    }
  }
`;

documents['DeleteJourney'] = gql`
  mutation DeleteJourney($id: UUID!) {
    deleteFromjourneyCollection(filter: {id: {eq: $id}}) {
      affectedCount
    }
  }
`;

documents['CompleteJourney'] = gql`
  mutation CompleteJourney($id: UUID!, $status: String!) {
    updatejourneyCollection(filter: {id: {eq: $id}}, set: {status: $status}) {
      affectedCount
      records {
        id
        status
      }
    }
  }
`;

documents['CreateJourney'] = gql`
  mutation CreateJourney($input: JourneyInsertInput!) {
    insertIntojourneyCollection(objects: [$input]) {
      affectedCount
      records {
        id
        from_address
        to_address
        fare
        inbound
        created_at
        status
        traveller_info {
          first_name
          last_name
          flight_number
          passenger_count
          phone_number
          id
        }
      }
    }
  }
`;

documents['CreateTraveller'] = gql`
  mutation CreateTraveller($input: Traveller_InfoInsertInput!) {
    insertIntotraveller_infoCollection(objects: [$input]) {
      affectedCount
      records {
        first_name
        last_name
        flight_number
        passenger_count
        phone_number
        id
      }
    }
  }
`;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */

export function graphql(source: string) {
    return (documents as any)[source] ?? {};
}

export function getAllJourneysEntries(): typeof documents['GetAllJourneys'] {
    return documents['GetAllJourneys'] ?? [];
}

export function getDriverInfo(): typeof documents['GetDriverInfo'] {
    return documents['GetDriverInfo'] ?? [];
}
export type DocumentType<TDocumentNode extends TypedDocumentNode<any, any>> =
    TDocumentNode extends TypedDocumentNode<infer TType, any> ? TType : never;