import { GetServerSideProps } from 'next';

export default function Tables() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/tables/flights',
      permanent: false,
    },
  };
};