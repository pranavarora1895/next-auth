import Link from "next/link";


export default function Home() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font h-screen items-center flex">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Welcome to
          <br className="hidden lg:inline-block"/>NextJS Authentication
        </h1>
        <p className="mb-8 leading-relaxed">Full-Stack Authentication System in NextJS including email verification and forgot password.</p>
        <div className="flex justify-center">
          <Link href={'/profile'} className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Profile</Link>
          <Link href={'/signup'} className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">Signup</Link>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img className="object-cover object-center rounded" alt="hero" src="https://images.pexels.com/photos/17155842/pexels-photo-17155842/free-photo-of-finger-scan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
      </div>
    </div>
  </section>
  );
}
