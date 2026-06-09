import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Articles from '@/components/Articles';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import GitHubCalendar from '@/components/GitHubCalendar';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollReveal from '@/components/ScrollReveal';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import MouseGlow from '@/components/MouseGlow';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <MouseGlow />
      <Nav />
      <main>
        <Hero />
        <Articles />
        <Projects />
        <Timeline />
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <GitHubCalendar username="shaoqiangchen77-dev" />
          </div>
        </section>
        <About />
        <Contact />
      </main>
      <Footer />
      <ThemeToggle />
      <BackToTop />
      <ScrollReveal />
    </>
  );
}
