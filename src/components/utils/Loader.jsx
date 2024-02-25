import { useLoading, Audio } from '@agney/react-loading';

function Loader() {
  const {indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="50" />
  });

  return (
    <section className='h-screen flex items-center justify-center'>
        {indicatorEl}
    </section>
  );
}

export default Loader;