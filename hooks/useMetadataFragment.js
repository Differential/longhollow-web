const { default: gql } = require('graphql-tag');

const METADATA_FRAGMENT = gql`
  fragment MetadataFragment on UniversalContentItem {
    time
    schedule
    deadline
    forWho
    isMembershipRequired
    groupEventType
    daysAvailable
    ministry
    serviceArea
    opportunityType
    relatedSkills
    childcareInfo
    location {
      name
      address
      latitude
      longitude
    }
    contactName
    contactEmail
    contactPhone
  }
`;

export default METADATA_FRAGMENT;
