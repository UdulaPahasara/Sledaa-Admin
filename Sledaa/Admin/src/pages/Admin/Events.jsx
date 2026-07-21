import React from 'react';
import CommonPage from '../../components/common/Admin/CommonPage';
import eventReuseImage from '../../assets/event/ReuseImage.webp';

const eventsData = [
  {
    id: 1,
    title: 'The First Annual Get Together',
    description: 'The first annual get together was held at the Youth Centre in Mount Waverley on 1 October 1994.',
    imageLeft: true,
  },
  {
    id: 2,
    title: 'The First Family Event',
    description: 'The first family day tour to Werribee park was held on 5 November 1994.',
    imageLeft: false,
  },
  {
    id: 3,
    title: 'The First Annual General Meeting',
    description: 'The first AGM of the association was held at neighbourhood house in Springvale on 24 June 1995. The annual dinner dance held at Holy Family parish hall in Doveton, Victoria.',
    imageLeft: true,
  },
  {
    id: 4,
    title: '30th Anniversary',
    description: 'The association screened a very popular Sinhala film "Visidela" (The fishing net) directed by renowned film director H. D. Premarathna to raise fund for the association. It was screened at Alexander Theatre of the Monash University, Clayton Campus on 11 February 1999. Mr. H. D Premarathna attended the event as the guest of honour.\n\nIn 1997, another film, "Chandni Kinnari" (Moon Lady), was screened at the Alexander Theatre, Monash University with the aim of raising funds to establish a scholarship fund for NDT students at the University of Moratuwa, Sri Lanka. This event also marked the 50th anniversary of Sinhala.',
    imageLeft: false,
  }
];

const Events = () => {
  return (
    <CommonPage
      title="EVENTS PAGE"
      buttonText="Add New Event"
      data={eventsData}
      imageSrc={eventReuseImage}
    />
  );
};

export default Events;
