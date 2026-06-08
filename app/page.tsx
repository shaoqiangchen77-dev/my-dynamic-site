import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Articles from '@/components/Articles';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Articles />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
