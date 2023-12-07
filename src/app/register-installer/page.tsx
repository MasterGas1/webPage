import Image from 'next/image';
import Form from './components/Form';

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-full">
      <section className="w-1/2 h-screen flex justify-center items-center bg-green-950 text-white">
        <Image width={300} height={300} src="/logo.png" alt="logo" />
      </section>
      <section className="w-1/2 h-screen  flex justify-center items-center">
        <Form />
      </section>
    </div>
  );
};

export default page;
