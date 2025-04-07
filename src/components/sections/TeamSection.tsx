import React from 'react';

const TeamSection = () => {
  // Team member data
  const teamMembers = [
    {
      name: 'Joden Newman',
      title: 'Founder and CEO',
      mainImage: '/assets/main/Meet_The_Team-webp/Joden/Joden-main1-nobg.webp',
      secondaryImage: '/assets/main/Meet_The_Team-webp/Joden/Joden-saw-nobg.webp',
      bio: 'Joden Clash Newman is the Founder and CEO at Clash Creation (yes Clash is literally his middle name). He started building content for founders over 3 years ago (and did very, very well). So decided to grow his own platform, reached millions of views and followers in only 3 months, and used that money to start his own company.',
      likes: ['long boring films in a language that doesn\'t exist (french)', 'grindset influencers', 'web design'],
      dislikes: ['long walks on the beach', 'meal deals', 'people not buying the vertical shortcut'],
      quote: 'His preferred order is 20 spicy wings and a Strawberry Miranda',
      quoteAuthor: 'his local boss man',
      color: '#ff8c1a',
      bgColor: '#fff0e6'
    },
    {
      name: 'Alex O\'Connor',
      title: 'Co-Founder and MD',
      mainImage: '/assets/main/Meet_The_Team-webp/Alex/Alex-main-nobg.webp',
      secondaryImage: '/assets/main/Meet_The_Team-webp/Alex/Alex-laugh-nobg.webp',
      bio: 'Alex O\'Connor is the Co-Founder and Managing Director at Clash Creation. He is the king of startups, with years of experience in organic marketing and management that he uses to keep us all getting paid. Plus he\'s got the gift of the gab which he uses to schmooz new clients.',
      likes: ['networking', 'networthing', 'gut health'],
      dislikes: ['ketchup', 'fizzy drinks', 'you (unless you buy the vertical shortcut)'],
      quote: 'He\'s actually pretty sound',
      quoteAuthor: 'his number one opp',
      color: '#387292',
      bgColor: '#e8f4f8'
    },
    {
      name: 'Tia Warner',
      title: 'Strategist, Writer and Researcher',
      mainImage: '/assets/main/Meet_The_Team-webp/Tia/Tia-main-nobg.webp',
      secondaryImage: '/assets/main/Meet_The_Team-webp/Tia/Tia-Boat-nobg.webp',
      bio: 'Tia is the content strategist, writer and researcher at Clash Creation. She has a masters in AI, and uses it to criticise people who use it to write lazy copy. Her experience in newsletters make her a research and writing master. But her addiction to TikTok is probably what actually makes her good at writing short form.',
      likes: ['cooking 10/10 dinners', 'eating said 10/10 dinners', '\'writing\' her sci-fi book'],
      dislikes: ['people asking how the book is going', 'people who don\'t buy the vertical shortcut'],
      quote: 'A veritable genius',
      quoteAuthor: 'an anonymous source close to Tia',
      color: '#DE6B59',
      bgColor: '#fbeae8'
    },
    {
      name: 'Aydan Banks',
      title: 'Video Producer',
      mainImage: '/assets/main/Meet_The_Team-webp/Aydan/Aydan-main-nobg.webp',
      secondaryImage: '/assets/main/Meet_The_Team-webp/Aydan/Aydan-explain-nobg.webp',
      bio: 'Aydan Banks is the Video Producer at Clash Creation. His career as a writer and producer in TV made him an expert at producing 10/10 videos. It also taught him that TV is a dying industry, and that short form is the most exciting and innovative space for young creatives to work in.',
      likes: ['stand up (when it goes well)', 'small hats', 'lime bikes'],
      dislikes: ['standup (when it goes badly)', 'matt hancock', 'when people don\'t buy the vertical shortcut'],
      quote: 'He knows all the secrets of the london underground',
      quoteAuthor: 'a high level TV exec (did you know he used to work in TV)',
      color: '#B92234',
      bgColor: '#f9e0e2'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      {/* Section header */}
      <div className="container mx-auto px-4 text-center mb-16 md:mb-20">
        <div className="inline-block mb-3 px-4 py-1.5 bg-primary-orange/10 dark:bg-primary-orange/20 rounded-full">
          <span className="text-primary-orange font-medium text-sm">Meet our team</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Meet the <span className="text-primary-orange">team</span>
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4 text-gray-700 dark:text-gray-300">
          We're not just a guy in a room. We're a team of creatives, who happen to be f*cking great at making content.
        </p>
      </div>

      {/* Team member cards - simple side-by-side layout */}
      <div className="container mx-auto px-4">
        <div className="space-y-24 md:space-y-32">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-3xl shadow-xl bg-white dark:bg-gray-800 
                ${index % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'}`}
              style={{maxWidth: '1100px'}}
            >
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Image container - always on left for mobile, alternating for desktop */}
                <div className={`relative h-[350px] md:h-auto md:w-1/2 flex items-end ${index % 2 === 1 ? 'md:order-2' : ''}`}
                  style={{
                    background: `linear-gradient(to bottom, ${member.bgColor}30, ${member.bgColor}80)`,
                  }}
                >
                  {/* Main character image */}
                  <div className="absolute inset-0 flex items-end justify-center z-20">
                    <img 
                      src={member.mainImage} 
                      alt={member.name} 
                      className="h-full w-auto object-contain object-bottom"
                      style={{ filter: `drop-shadow(0 0 15px ${member.color}40)` }}
                    />
                  </div>
                  
                  {/* Secondary character image */}
                  {member.secondaryImage && (
                    <div className="absolute inset-0 flex items-end justify-center z-10">
                      <img 
                        src={member.secondaryImage} 
                        alt={`${member.name} second pose`} 
                        className="h-[85%] w-auto object-contain object-bottom opacity-70 transform -translate-x-12"
                        style={{ filter: `drop-shadow(0 0 10px ${member.color}30)` }}
                      />
                    </div>
                  )}
                  
                  {/* Color accent at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: member.color }}></div>
                </div>
                
                {/* Content container */}
                <div className={`relative md:w-1/2 p-6 md:p-8 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  {/* Name and title */}
                  <div className="border-l-4 pl-4 mb-6" style={{ borderColor: member.color }}>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xl font-medium" style={{ color: member.color }}>
                      {member.title}
                    </p>
                  </div>
                  
                  {/* Bio */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {member.bio}
                  </p>
                  
                  {/* Likes and dislikes */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="rounded-lg p-4" style={{ backgroundColor: `${member.color}10` }}>
                      <h4 className="font-bold mb-2 flex items-center" style={{ color: member.color }}>
                        <span className="mr-2">❤️</span> Likes
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {member.likes.map((like, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{like}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="rounded-lg p-4" style={{ backgroundColor: `${member.color}10` }}>
                      <h4 className="font-bold mb-2 flex items-center" style={{ color: member.color }}>
                        <span className="mr-2">👎</span> Dislikes
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        {member.dislikes.map((dislike, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{dislike}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="italic text-lg border-l-2 pl-4 text-gray-600 dark:text-gray-400"
                    style={{ borderColor: member.color }}
                  >
                    "{member.quote}"
                    <cite className="block text-sm mt-2 not-italic font-medium text-gray-500 dark:text-gray-500">
                      — {member.quoteAuthor}
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
