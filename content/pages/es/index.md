---
title: Inicio
description: Calcula gratis los días de visa y la residencia fiscal para Schengen, el Reino Unido y otras regiones. Herramienta rápida para las reglas 90/180 y 183 días.
type: Page
sections:
  - type: HeroSection
    title: Calculadora de días de visa y residencia fiscal
    subtitle: 'Consulta el cálculo de días de visa y residencia fiscal para Schengen, el Reino Unido y otras regiones. Gratis. En segundos.'
    text: >
      Calcula fácilmente los días que has pasado o puedes permanecer en un país según las normas de visa y las reglas de cálculo de residencia fiscal. Ya sea para el Espacio Schengen, el Reino Unido u otras regiones, nuestra herramienta simplifica la planificación de tus viajes. Usa nuestra calculadora gratuita para gestionar las estancias con visa y los umbrales de residencia fiscal de forma eficaz. Ya sea que estés navegando la regla 90/180, comprobando límites de visita o haciendo seguimiento de tu estatus de residencia fiscal de 183 días, ¡te tenemos cubierto!
    actions:
      - type: Button
        label: Iniciar cálculo
        url: 'calculation_section'
        size: large
        variant: contained
        color: primary
      - type: Button
        label: Cómo funciona
        url: 'information_section'
        size: large
        variant: outlined
        color: primary
    image:
      type: Image
      url: /images/calculator_visa_online_desktop.webp
      mobileUrl: /images/calculator_visa_online_mobile.webp
      altText: Imagen de la calculadora de visa en línea
  - type: InformationSection
    title: Reglas generales del cálculo de la regla de visa 90/180
    description: >
      La regla de 90/180 días es una normativa de visa común en el Espacio Schengen y en algunos otros países. La regla establece que:
    keyPoints:
      - Un visitante no puede permanecer en la Zona Schengen más de 90 días en cualquier período móvil de 180 días.
      - El período de 180 días no es fijo; es una ventana móvil, lo que significa que cada nuevo día desplaza el período de conteo hacia adelante.
      - La regla se aplica a todos los viajeros de corta estancia sin visa (por ejemplo, titulares de pasaporte del Reino Unido, EE. UU., Canadá y Australia que visitan Schengen).
      - 'Tener ETIAS no cambia tu cupo bajo la regla 90/180: aún no debes superar los 90 días en ningún período de 180 días.'
  - type: InformationSection
    title: Reglas clave para calcular los días de visa. ¿Cómo calcular?
    description:
    keyPoints:
      - Cada nueva entrada cuenta para la ventana móvil de 180 días
      - Salir no reinicia el conteo; las estancias anteriores en los últimos 180 días siguen contando
      - Se combinan varias estancias; si una persona sale y vuelve a entrar, los días anteriores siguen contándose
      - Si un viajero ya ha permanecido 90 días en los últimos 180 días, debe salir y esperar a que los días «caigan» antes de volver a entrar
  - type: InformationSection
    title: Reglas generales del cálculo de residencia fiscal de 183 días
    description: >
      La regla de 183 días es un umbral común para evaluar la residencia fiscal en muchos países. Aunque los detalles varían según la jurisdicción, el principio general es:
    keyPoints:
      - Si tu presencia física alcanza 183 días o más en el período relevante, puedes ser considerado residente fiscal.
      - El período relevante puede ser un año calendario (1 de enero - 31 de diciembre) o una ventana móvil, según el país.
      - Los métodos de conteo de días pueden diferir según la jurisdicción (por ejemplo, el tratamiento de los días de llegada/salida), así que verifica siempre la normativa local.
      - El estatus de residencia fiscal puede afectar las obligaciones de declaración y la posible tributación de la renta mundial.
  - type: InformationSection
    title: Reglas clave para calcular los días de residencia fiscal. ¿Cómo calcular?
    description:
    keyPoints:
      - Registra cada día de presencia en el país y conserva registros de viaje completos.
      - Selecciona la ventana fiscal correcta para la regla de tu país (año calendario o período móvil).
      - Combina todas las estancias en la ventana seleccionada para obtener el total de días para el cálculo de residencia fiscal.
      - Cuando tu total se acerque a 183 días, planifica con antelación y confirma tu estatus con orientación oficial o un asesor cualificado.
  - type: CalculationSection
    title: Calcula días de visa y residencia fiscal
    enterTitle: Fecha de entrada
    exitTitle: Fecha de salida
    addButtonText: Añadir fechas
    selectedDateText: Fecha seleccionada
    resultText:
      daysRemainToStay: Días restantes para permanecer
      wantToPersistResults: ¿Quieres guardar los resultados del cálculo?
      registerCta: Regístrate con Google
      registerCta2: gratis y accede cuando lo necesites.

  - type: CardsSection
    title: Mantente informado - Recursos esenciales
    subtitle: Directrices oficiales para viajar con inteligencia y cumplir la normativa
    items:
      - type: Card
        title: Información sobre visa Schengen - Reglas y directrices oficiales
        image:
          type: Image
          url: /images/border-guard.svg
          altText: Imagen de control fronterizo
        text: >
          Mantente informado con las últimas normativas de visa Schengen, requisitos de entrada y límites de estancia directamente de fuentes fiables.
        actions:
          - type: Button
            label: Leer la documentación
            url: 'https://www.schengenvisainfo.com/'
      - type: Card
        title: Migración y Asuntos de Interior de la UE - Política de visados
        image:
          type: Image
          url: /images/visa-stamp.svg
          altText: Imagen de sello de visa
        text: >
          Explora información detallada sobre la política de visados de la UE, incluida la regla 90/180 y los acuerdos específicos por país.
        actions:
          - type: Button
            label: Leer la documentación
            url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en/'
      - type: Card
        title: Sistema Europeo de Información y Autorización de Viaje (ETIAS)
        image:
          type: Image
          url: /images/international-passport.svg
          altText: Imagen de pasaporte internacional
        text: >
          Infórmate sobre los requisitos de ETIAS, diseñado para viajeros exentos de visa al Espacio Schengen, y mantente al día de los próximos cambios
        actions:
          - type: Button
            label: Leer la documentación
            url: 'https://travel-europe.europa.eu/etias_en/'
      - type: Card
        title: OCDE - Orientación sobre residencia fiscal
        image:
          type: Image
          url: /images/international-passport.svg
          altText: Imagen de pasaporte internacional
        text: >
          Consulta orientación internacional sobre conceptos de residencia fiscal y estándares de transparencia transfronteriza de la OCDE.
        actions:
          - type: Button
            label: Leer la documentación
            url: 'https://www.oecd.org/en/networks/global-forum-tax-transparency/resources/aeoi-implementation-portal/tax-residency.html'
      - type: Card
        title: IRS - Prueba de presencia sustancial
        image:
          type: Image
          url: /images/border-guard.svg
          altText: Imagen de control fronterizo
        text: >
          Consulta las normas oficiales de residencia fiscal de EE. UU. y la metodología de conteo de días bajo la prueba de presencia sustancial.
        actions:
          - type: Button
            label: Leer la documentación
            url: 'https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test/'
      - type: Card
        title: Tu Europa - Impuestos sobre la renta en el extranjero
        image:
          type: Image
          url: /images/visa-stamp.svg
          altText: Imagen de sello de visa
        text: >
          Encuentra orientación oficial de la UE para ciudadanos que gestionan impuestos sobre la renta transfronterizos y obligaciones fiscales relacionadas con la residencia.
        actions:
          - type: Button
            label: Leer la documentación
            url: 'https://europa.eu/youreurope/citizens/work/taxes/income-taxes-abroad/'
---
