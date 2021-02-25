const ExperienceBar = () => {
  return (
    <header id="experience-bar">
      <span>0 xp</span>
      <div>
        <div style={{width: '50%'}}></div>
        <span id="currentExperience" style={{left: '50%'}}>300 xp</span>
      </div>
      <span>600 xp</span>
    </header>
  )
}

export default ExperienceBar
