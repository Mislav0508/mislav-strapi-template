import gql from 'graphql-tag';
    export const allEventQuery = gql`
    query AllEvents {
      events {
        data {
          id
          attributes {
            title,
            date,
            url
            image {
              data{
                attributes{
                  name
                }
              }
            }
          }
        }
      }
    }
    `