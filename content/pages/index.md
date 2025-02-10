---
title: Home
type: Page
sections:
  - type: HeroSection
    title: Visa Calculator 
    subtitle: 'Check your visa days remaining for Schengen, UK, and other regions. For free. In seconds.'
    text: >
      Easily calculate the days you've spent or can stay in a country based on the visa rules. Whether for Schengen Area, UK, or others, our tool simplifies your travel planning. Use our free visa calculator to manage your travel days effectively. Whether you're navigating the 90/180 rule, checking visitor limits, or tracking multiple countries' visas, we’ve got you covered!
    actions:
      - type: Button
        label: Start Calculation
        url: 'calculation_section'
        size: large
        variant: contained
        color: primary
      - type: Button
        label: Learn How It Works
        url: 'information_section'
        size: large
        variant: outlined
        color: primary
    image:
      type: Image
      url: /images/calculator_visa_online_desktop.webp
      mobileUrl: /images/calculator_visa_online_mobile.webp
      altText: Online Visa Calculator image
  - type: InformationSection
    title: General Calculation Logic for Visa 90/180 Days Counting
    description: >
      The 90/180-day rule is a common visa regulation used in the Schengen Area and some other countries. The rule states that:
    keyPoints: 
      - A visitor cannot stay in the Schengen Zone for more than 90 days within any rolling 180-day period.
      - The 180-day period is not fixed; it’s a moving window, meaning each new day moves the counting period forward.
      - The rule applies to all short-term visa-free travelers (e.g., UK, US, Canadian, and Australian passport holders visiting Schengen).
  - type: InformationSection
    title: Key Points for Calculating Days. How do we calculate?
    description: 
    keyPoints: 
      - Every new entry counts towards the rolling 180-day window
      - Exiting doesn’t reset the count; previous stays in the past 180 days still matter
      - Multiple stays are combined; if a person leaves and re-enters, previous days are still counted
      - If a traveler has already stayed 90 days in the past 180 days, they must leave and wait until days “drop off” before re-entering
  - type: CalculationSection
    title: Add entry and exit dates to calculate
    enterTitle: Date of entry
    exitTitle: Date of exit
    addButtonText: Add dates
  - type: CardsSection
    title: Stay Informed - Essential Resources
    subtitle: Official Guidelines to Help You Travel Smart and Stay Compliant
    items:
      - type: Card
        title: Schengen Visa Info - Official Rules & Guidelines
        image:
          type: Image
          url: /images/border-guard.svg
          altText: Border guard image
        text: >
          Stay informed with the latest Schengen visa regulations, entry requirements, and stay limits directly from trusted sources.
        actions:
          - type: Button
            label: Read the Docs
            url: 'https://www.schengenvisainfo.com/'
      - type: Card
        title: EU Migration and Home Affairs - Visa Policy
        image:
          type: Image
          url: /images/visa-stamp.svg
          altText: Visa stamp image
        text: >
          Explore detailed information about the EU’s visa policy, including the 90/180-day rule and country-specific agreements.
        actions:
          - type: Button
            label: Read the Docs
            url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en/'
      - type: Card
        title: European Travel Information and Authorisation System (ETIAS)
        image:
          type: Image
          url: /images/international-passport.svg
          altText: International passport image
        text: >
          Learn about ETIAS requirements, designed for visa-exempt travelers to the Schengen Area, and stay updated on upcoming changes
        actions:
          - type: Button
            label: Read the Docs
            url: 'https://travel-europe.europa.eu/etias_en/'
---
