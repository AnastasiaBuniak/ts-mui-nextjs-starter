<!-- TODO: translate this page to fr. Seeded from default locale. -->

---
title: Home
type: Page
sections:
  - type: HeroSection
    title: Visa & Tax Residency Calculator
    subtitle: 'Check visa days and tax residency calculations for Schengen, UK, and other regions. For free. In seconds.'
    text: >
      Easily calculate the days you've spent or can stay in a country based on visa rules and tax residency calculation rules. Whether for Schengen Area, UK, or others, our tool simplifies your travel planning. Use our free calculator to manage visa stays and tax residency thresholds effectively. Whether you're navigating the 90/180 rule, checking visitor limits, or tracking your 183-day tax residency status, we’ve got you covered!
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
    title: General Rules of 90/180 visa rule calculation
    description: >
      The 90/180-day rule is a common visa regulation used in the Schengen Area and some other countries. The rule states that:
    keyPoints:
      - A visitor cannot stay in the Schengen Zone for more than 90 days within any rolling 180-day period.
      - The 180-day period is not fixed; it’s a moving window, meaning each new day moves the counting period forward.
      - The rule applies to all short-term visa-free travelers (e.g., UK, US, Canadian, and Australian passport holders visiting Schengen).
      - Having ETIAS does not change your allowance under the 90/180 rule — you still must not exceed 90 days in any 180-day period.
  - type: InformationSection
    title: Key rules for calculating visa days. How to calculate?
    description:
    keyPoints:
      - Every new entry counts towards the rolling 180-day window
      - Exiting doesn’t reset the count; previous stays in the past 180 days still matter
      - Multiple stays are combined; if a person leaves and re-enters, previous days are still counted
      - If a traveler has already stayed 90 days in the past 180 days, they must leave and wait until days “drop off” before re-entering
  - type: InformationSection
    title: General rules of 183-day tax residency calculation
    description: >
      The 183-day rule is a common threshold used to assess tax residency in many countries. While details vary by jurisdiction, the general principle is:
    keyPoints:
      - If your physical presence reaches 183 days or more in the relevant period, you may be treated as a tax resident.
      - The relevant period can be a calendar year (Jan 1 - Dec 31) or a rolling window, depending on the country.
      - Day-counting methods can differ by jurisdiction (for example, treatment of arrival/departure days), so always verify local guidance.
      - Tax residency status can affect filing obligations and potential taxation of worldwide income.
  - type: InformationSection
    title: Key rules for calculating tax residency days. How to calculate?
    description:
    keyPoints:
      - Track each day of presence in the country and keep complete travel records.
      - Select the correct tax window for your country rule (calendar year or rolling period).
      - Combine all stays in the selected window to get your total days for tax residency calculation.
      - When your total approaches 183 days, plan ahead and confirm your status with official guidance or a qualified advisor.
  - type: CalculationSection
    title: Calculate visa days and tax residency
    enterTitle: Date of entry
    exitTitle: Date of exit
    addButtonText: Add dates
    selectedDateText: Selected date
    resultText:
      daysRemainToStay: Days remain to stay
      wantToPersistResults: Want to persist the calculations results?
      registerCta: Register with Google
      registerCta2: for free and access it whenever you need it.

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
      - type: Card
        title: OECD - Tax Residency Guidance
        image:
          type: Image
          url: /images/international-passport.svg
          altText: International passport image
        text: >
          Review international guidance on tax residency concepts and cross-border transparency standards from the OECD.
        actions:
          - type: Button
            label: Read the Docs
            url: 'https://www.oecd.org/en/networks/global-forum-tax-transparency/resources/aeoi-implementation-portal/tax-residency.html'
      - type: Card
        title: IRS - Substantial Presence Test
        image:
          type: Image
          url: /images/border-guard.svg
          altText: Border guard image
        text: >
          Check official U.S. tax residency rules and day-counting methodology used under the substantial presence test.
        actions:
          - type: Button
            label: Read the Docs
            url: 'https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test/'
      - type: Card
        title: Your Europe - Income Taxes Abroad
        image:
          type: Image
          url: /images/visa-stamp.svg
          altText: Visa stamp image
        text: >
          Find official EU guidance for citizens managing cross-border income tax and residency-related tax obligations.
        actions:
          - type: Button
            label: Read the Docs
            url: 'https://europa.eu/youreurope/citizens/work/taxes/income-taxes-abroad/'
---
