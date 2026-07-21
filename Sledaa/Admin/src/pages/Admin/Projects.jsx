import React from 'react';
import CommonPage from '../../components/common/Admin/CommonPage';
import projectReuseImage from '../../assets/project/ProjectReuseImg.webp';

const projectsData = [
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

const Projects = () => {
  return (
    <CommonPage
      title="PROJECTS PAGE"
      buttonText="Add New Project"
      data={projectsData}
      imageSrc={projectReuseImage}
    />
  );
};

export default Projects;
