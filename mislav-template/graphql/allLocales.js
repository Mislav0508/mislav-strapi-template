import gql from 'graphql-tag';
    export const allLocales = gql`
    query allLocales {
      navbars(locale:"all") {data{attributes{
        link_home,
        link_rooms,
        sublink_rooms,
        sublink_superior,
        sublink_deluxe,
        sublink_signature,
        sublink_luxury,
        link_about,
        link_gallery,
        link_explore,
        link_contact
    
      }}}
      homepageSliders(locale:"all"){data{attributes{
        slide_title,
        slide_subtitle,
        slide_img_url
      }}}
    }
    `