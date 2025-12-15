import React from 'react'
import CTAButton from './CTAButton'


export default function Hero(){
return (
<section className="hero" aria-labelledby="hero-heading">


<div className="hero-bg" aria-hidden="true"></div>


<div className="hero-overlay-top"></div>
<div className="hero-blur-bottom" aria-hidden="true"></div>


<div className="hero-content">
<h1 id="hero-heading"> Homemade. Healthy. By Moms Hands.</h1>
<p> Discover mini cloud kitchens run by local moms—fresh, hygienic meals made with love.</p>


<div className="hero-actions">
<CTAButton />
<a href="#learn" className="secondary-btn">Learn more</a>
</div><div class="proof">
<p class="proof__heading">Trusted by 1,200+ local families</p>
      <ul class="proof__logos" role="list">
        <li aria-label="Fresh & Hygienic">🥗</li>
        <li aria-label="No artificial colors">🚫🎨</li>
        <li aria-label="2-3 km delivery">📍</li>
        <li aria-label="Mom-owned">👩‍🍳</li>
      </ul>
</div>
</div>
</section>
)
}