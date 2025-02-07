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
      url: /images/calculator_visa_edited_3.png
      altText: Hero section image
  - type: InformationSection
    title: General Calculation Logic for Visa 90/180 Days Counting
    description: >
      The 90/180-day rule is a common visa regulation used in the Schengen Area and some other countries. The rule states that:
    keyPoints: 
      - A visitor cannot stay in the Schengen Zone for more than 90 days within any rolling 180-day period.
      - The 180-day period is not fixed; it’s a moving window, meaning each new day moves the counting period forward.
      - The rule applies to all short-term visa-free travelers (e.g., UK, US, Canadian, and Australian passport holders visiting Schengen).
  - type: InformationSection
    title: Key Points for Calculating Days
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
  # - type: CardsSection
  #   title: Cards Section Component
  #   subtitle: Section subtitle here
  #   items:
  #     - type: Card
  #       title: First Card Title
  #       image:
  #         type: Image
  #         url: /images/nextjs.svg
  #         altText: First item image
  #       text: >
  #         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  #         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  #         minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  #         aliquip ex ea commodo consequat.
  #       actions:
  #         - type: Button
  #           label: Read the Docs
  #           url: 'https://docs.netlify.com/visual-editor/overview/'
  #     - type: Card
  #       title: Second Card Title
  #       image:
  #         type: Image
  #         url: /images/mui-5.svg
  #         altText: Second item image
  #       text: >
  #         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  #         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  #         minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  #         aliquip ex ea commodo consequat.
  #       actions:
  #         - type: Button
  #           label: Read the Docs
  #           url: 'https://docs.netlify.com/visual-editor/overview/'
  #     - type: Card
  #       title: Third Card Title
  #       image:
  #         type: Image
  #         url: /images/ts.svg
  #         altText: Third item image
  #       text: >
  #         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  #         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  #         minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  #         aliquip ex ea commodo consequat.
  #       actions:
  #         - type: Button
  #           label: Read the Docs
  #           url: 'https://docs.netlify.com/visual-editor/overview/'
---
