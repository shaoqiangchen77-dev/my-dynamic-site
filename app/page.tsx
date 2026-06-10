import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Articles from '@/components/Articles';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import GitHubCalendar from '@/components/GitHubCalendar';
import About from '@/components/About';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollReveal from '@/components/ScrollReveal';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import MouseGlow from '@/components/MouseGlow';
import MouseTrail from '@/components/MouseTrail';
import StatsDashboard from '@/components/StatsDashboard';
import QuoteRotator from '@/components/QuoteRotator';
import TechConstellation from '@/components/TechConstellation';
import KonamiEasterEgg from '@/components/KonamiEasterEgg';
import ShootingStar from '@/components/ShootingStar';
import BadgeWall from '@/components/BadgeWall';
import SkillCube from '@/components/SkillCube';
import MessageBoard from '@/components/MessageBoard';
import ParallaxSection from '@/components/ParallaxSection';
import MiniGame from '@/components/MiniGame';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <MouseGlow />
      <MouseTrail />
      <KonamiEasterEgg />
      <ShootingStar />
      <ParallaxSection />
      <Nav />
      <main>
        <Hero />
        <QuoteRotator />
        <StatsDashboard />
        <BadgeWall />
        <Articles />
        <Projects />
        <TechConstellation />
        <SkillCube />
        <Timeline />
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <GitHubCalendar username="shaoqiangchen77-dev" />
          </div>
        </section>
        <About />
        <MiniGame />
        <MessageBoard />
      </main>
      <Footer />
      <ThemeToggle />
      <BackToTop />
      <ScrollReveal />
    </>
  );
}
