import React from 'react';
import CommonPage from '../../components/common/Admin/CommonPage';
import newsReuseImage from '../../assets/news/NewsReuseImg.webp';

const newsData = [
  {
    id: 1,
    title: 'The First Annual Get Together',
    description: 'Lorem ipsum dolor sit amet consectetur. Urna sed non sapien sagittis convallis nibh cursus varius.\nLorem ipsum dolor sit amet consectetur. Urna sed non sapien sagittis convallis nibh cursus varius Lorem ipsum dolor sit ame.',
    imageLeft: true,
  },
  {
    id: 2,
    title: 'Lorem Lipsum Solor Lorem kkias',
    description: 'Lorem ipsum dolor sit amet consectetur. Urna sed non sapien sagittis convallis nibh cursus varius.\nLorem ipsum dolor sit amet consectetur. Urna sed non sapien sagittis convallis nibh cursus varius Lorem ipsum dolor sit ame.',
    imageLeft: false,
  },
  {
    id: 3,
    title: 'The First Annual Get Together',
    description: 'Lorem ipsum dolor sit amet consectetur. Urna sed non sapien sagittis convallis nibh cursus varius.\nLorem ipsum dolor sit amet consectetur. Urna sed non sapien sagittis convallis nibh cursus varius Lorem ipsum dolor sit ame.',
    imageLeft: true,
  },
  {
    id: 4,
    title: 'Lorem Lipsum Solor Lorem kkias',
    description: 'Lorem ipsum dolor sit amet consectetur. Urna sed non sapien sagittis convallis nibh cursus varius.\nLorem ipsum dolor sit amet consectetur. Urna sed non sapien sagittis convallis nibh cursus varius Lorem ipsum dolor sit ame.',
    imageLeft: false,
  }
];

const News = () => {
  return (
    <CommonPage
      title="NEWS PAGE"
      buttonText="Add New News"
      data={newsData}
      imageSrc={newsReuseImage}
    />
  );
};

export default News;
