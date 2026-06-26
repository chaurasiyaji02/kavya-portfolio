import { motion } from 'framer-motion';

function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <motion.p
          className="text-sm font-medium uppercase tracking-[0.2em] text-teal-300"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dynamic Portfolio Scaffold
        </motion.p>
        <motion.h1
          className="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Kavya Portfolio
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Initial React, Tailwind CSS, Framer Motion, Spring Boot, and PostgreSQL project structure.
        </motion.p>
      </section>
    </main>
  );
}

export default App;
