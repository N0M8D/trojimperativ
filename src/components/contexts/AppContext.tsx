import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'cs' | 'en';
type Theme = 'light' | 'dark' | 'system';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Lokalizační slovníky
const translations = {
  cs: {
    // Header
    'title': 'Trojimperativ Projektu',
    'subtitle': 'Objevte tajemství úspěšného projektového managementu! Interaktivní vizualizace ukazuje, proč nemůžete mít projekt rychlý, levný a kvalitní současně.',
    'interactive_simulator': 'Interaktivní simulátor',
    'practical_examples': 'Praktické příklady',
    'real_situations': 'Reálné situace',

    // Tabs
    'simulator_tab': 'Interaktivní simulátor',
    'theory_tab': 'Teorie & příklady',

    // Simulator
    'simulator_title': '🎮 Interaktivní simulátor projektu',
    'simulator_description': 'Experimentujte s jednotlivými faktory pomocí sliderů a sledujte v reálném čase, jak se změny projeví na realističnosti vašeho projektu. Červená tečka v trojúhelníku ukazuje aktuální pozici vašeho projektu.',
    'how_it_works': 'Jak to funguje?',
    'how_it_works_description': 'Změna jednoho faktoru ovlivní ostatní dva',

    // Factors
    'time': 'Čas',
    'budget': 'Rozpočet',
    'quality': 'Kvalita/Rozsah',

    // Factor explanations
    'when_increase_time': 'Když zvýšíte čas',
    'when_increase_time_desc': 'Můžete snížit rozpočet nebo zvýšit kvalitu. Více času = méně stresu a lepší výsledky.',
    'when_increase_budget': 'Když zvýšíte rozpočet',
    'when_increase_budget_desc': 'Můžete zkrátit čas nebo zvýšit kvalitu. Více peněz = více lidí a lepší nástroje.',
    'when_increase_quality': 'Když zvýšíte kvalitu',
    'when_increase_quality_desc': 'Potřebujete více času nebo rozpočtu. Vyšší kvalita = více práce a pečlivosti.',

    // Intensity levels
    'minimal': 'Minimální',
    'low': 'Nízký',
    'standard': 'Standardní',
    'high': 'Vysoký',
    'maximum': 'Maximální',

    // Sharing
    'share_settings': 'Sdílet aktuální nastavení',
    'share_settings_desc': 'Zkopírujte odkaz s aktuálním rozdělením faktorů',
    'copy_link': 'Kopírovat odkaz',
    'link_copied': 'Odkaz zkopírován!',
    'link_copied_desc': 'Můžete jej sdílet s ostatními.',
    'copy_failed': 'Nepodařilo se zkopírovat odkaz',
    'copy_failed_desc': 'Zkuste to znovu.',

    // Realism
    'project_realism': 'Realističnost projektu',
    'current_distribution': 'Aktuální rozdělení:',
    'total': 'Celkem:',

    // Realism levels  
    'highly_realistic': 'Vysoce realistický',
    'realistic_with_compromises': 'Realistický s kompromisy',
    'problematic': 'Problematický',
    'unrealistic': 'Nerealistický',

    // Realism descriptions
    'highly_realistic_desc': 'Tento projekt má dobré šance na úspěch bez větších problémů.',
    'realistic_with_compromises_desc': 'Projekt je realizovatelný, ale bude vyžadovat kompromisy a pečlivou správu.',
    'problematic_desc': 'Projekt bude velmi náročný a pravděpodobně překročí plánované rámce.',
    'unrealistic_desc': 'Tento projekt je nerealistický v dané konfiguraci. Zvažte úpravu požadavků.',

    // Detailed analysis
    'why_rating': 'Proč je hodnocení',
    'detailed_analysis': '% - Detailní analýza',
    'reasons_for_rating': 'Důvody aktuálního hodnocení:',
    'main_risks': 'Hlavní rizika tohoto nastavení:',
    'real_world_impacts': 'Co se může reálně stát:',
    'recommendations': 'Doporučení pro zlepšení:',
    'quick_summary': 'Rychlé shrnutí:',

    // Fallback messages
    'basic_setting_no_reasons': 'Aktuální nastavení je základní - žádné specifické důvody k hodnocení',
    'no_serious_risks': '✅ Při tomto nastavení nejsou identifikována závažná rizika',
    'no_specific_impacts': 'Toto nastavení nemá specifické dopady na realizaci projektu',
    'no_specific_recommendations': '👍 Pro toto nastavení nejsou nutná specifická doporučení',

    // Summary messages based on score
    'summary_excellent': 'Vaše nastavení je velmi realistické a má vysoké šance na úspěch. Držte se plánu!',
    'summary_good': 'Projekt je realizovatelný, ale budete muset dělat kompromisy. Připravte se na výzvy.',
    'summary_problematic': 'Aktuální nastavení je problematické. Seriously zvažte úpravu požadavků.',
    'summary_unrealistic': 'Toto nastavení je velmi nerealistické. Nutně potřebujete přehodnotit priority projektu.',

    // Theory section
    'what_is_triangle': 'Co je trojimperativ projektu?',
    'triangle_description': 'Trojimperativ projektu je základní zákon projektového managementu, který říká, že každý projekt je omezen třemi faktory - a nemůžete mít všechny tři na maximum současně.',
    'triangle_rule': 'Základní pravidlo trojimperativu',
    'triangle_rule_text': '"Rychle, levně, kvalitně - vyberte si dvě!" Nemůžete mít všechny tři na maximum současně. Pokud chcete všechny tři, budete muset udělat kompromisy.',
    'possible_combinations': 'Možné kombinace:',
    'fast_cheap': 'Rychle + Levně',
    'fast_quality': 'Rychle + Kvalitně',
    'cheap_quality': 'Levně + Kvalitně',
    'all_three_impossible': 'Rychle + Levně + Kvalitně',
    'lower_quality': 'Nižší kvalita',
    'expensive': 'Draho',
    'slowly': 'Pomalu',
    'impossible': 'Nemožné!',

    // Examples
    'practical_examples_title': 'Praktické příklady z různých odvětví',
    'it_development': 'IT & Vývoj softwaru',
    'marketing_advertising': 'Marketing & Reklama',
    'construction': 'Stavebnictví',
    'ecommerce_project': 'E-commerce projekt',

    // Common situations
    'common_situations': 'Časté situace a jejich řešení',
    'crisis_situation': '"Potřebujeme to včera, ale nemáme rozpočet"',
    'crisis_desc': 'Častá situace v krizových momentech. Klient chce rychlé řešení za minimum peněz.',
    'crisis_solution': 'Řešení: Nabídněte zjednodušenou verzi řešení (MVP), použijte existující šablony nebo nástroje, odložte "nice-to-have" funkce na později.',
    'unlimited_budget': '"Máme deadline za měsíc a neomezený rozpočet"',
    'unlimited_budget_desc': 'Situace, kdy je čas kritický, ale peníze nejsou problém.',
    'unlimited_budget_solution': 'Řešení: Najměte více lidí, použijte prémiové nástroje a služby, pracujte ve více směnách, nakupte hotová řešení místo vývoje vlastních.',
    'quality_focus': '"Chceme top kvalitu, máme malý rozpočet, ale čas není problém"',
    'quality_focus_desc': 'Ideální situace pro kvalitní práci s omezenými zdroji.',
    'quality_focus_solution': 'Řešení: Pečlivé plánování, postupný vývoj, vlastní tým, důkladné testování, využití open source nástrojů, učení se v průběhu.',

    // Practical tips
    'practical_tips': 'Praktické tipy pro úspěch',
    'before_project': 'Před zahájením projektu:',
    'during_project': 'Během realizace:',
    'golden_rule': 'Zlaté pravidlo',
    'golden_rule_text': 'Raději jeden faktor obětujte záměrně, než abyste selhali ve všech třech. Klienti ocení transparentnost a realistická očekávání více než nesplněné sliby.',

    // Footer
    'educational_tool': 'Vzdělávací nástroj',
    'key_features': 'Klíčové funkce',
    'interactive_simulator_feature': 'Interaktivní simulátor projektu',
    'practical_examples_feature': 'Praktické příklady z různých odvětví',
    'real_situations_feature': 'Reálné situace a jejich řešení',
    'factor_visualization': 'Vizualizace vztahů mezi faktory',
    'communicate_clearly': 'Komunikujte jasně: Vždy diskutujte omezení s týmem na začátku projektu',
    'find_balance': 'Hledejte rovnováhu: Nejlepší projekty mají vyvážené rozdělení všech tří faktorů',
    'modern_web_tech': 'Vytvořeno s moderními web technologiemi',
    'project_management': 'Projektový management',
    'interactive': 'Interaktivní',
    'start_experimenting': 'Začněte experimentovat s trojimperativem a objevte principy úspěšného projektového řízení',

    // Settings
    'language': 'Jazyk',
    'theme': 'Téma',
    'light': 'Světlé',
    'dark': 'Tmavé',
    'system': 'Systém',

    // Practical examples content
    'fast_cheap_it': 'MVP (Minimum Viable Product) - základní funkcionalita, ale bez pokročilých features. Častý v startupech.',
    'fast_quality_it': 'Outsourcing senior vývojářů nebo hotových řešení. Drahé, ale rychlé a kvalitní.',
    'cheap_quality_it': 'Open source řešení, vlastní tým juniorů s mentoringem. Trvá déle, ale výsledek je kvalitní.',

    'fast_cheap_marketing': 'Šablony, stock fotky, automatizované nástroje. Rychlé spuštění kampaně s omezenou originalitou.',
    'fast_quality_marketing': 'Najímání top kreativní agentury s expresními cenami. Prémiová kvalita za prémiovou cenu.',
    'cheap_quality_marketing': 'Interní tým, dlouhý kreativní proces, pečlivé testování. Výborný výsledek, ale trvá měsíce.',

    'fast_cheap_construction': 'Montované domy, základní materiály. Rychlé dokončení, ale omezené možnosti úprav.',
    'fast_quality_construction': 'Více směn, prémiové materiály, experti. Luxusní výsledek v rekordním čase za vysokou cenu.',
    'cheap_quality_construction': 'Vlastní práce, postupné stavění, čekání na slevy materiálů. Roky práce, ale skvělý výsledek.',

    'fast_cheap_ecommerce': 'Shopify šablona, základní platební brána. Spuštění za týden, ale omezené možnosti customizace.',
    'fast_quality_ecommerce': 'Vývojářský tým na plný úvazek, custom řešení. Jedinečný e-shop za měsíc, ale draho.',
    'cheap_quality_ecommerce': 'Postupný vývoj vlastními silami, open source nástroje. Půl roku práce, ale výsledek na míru.',

    // Practical tips content
    'tip_define_priorities': 'Jasně definujte priority s klientem/týmem',
    'tip_communicate_triangle': 'Komunikujte trojimperativ všem stakeholderům',
    'tip_prepare_scenarios': 'Připravte si scénáře "co když"',
    'tip_document_decisions': 'Dokumentujte kompromisy a důvody',
    'tip_evaluate_regularly': 'Pravidelně vyhodnocujte aktuální situaci',
    'tip_be_ready_changes': 'Buďte připraveni na změny priorit',
    'tip_communicate_impacts': 'Komunikujte dopady změn na ostatní faktory',
    'tip_resist_pressure': 'Nepodléhejte tlaku na "všechno naráz"',

    // Detailed analysis translations
    'analysis_balanced_distribution': 'Vyvážené rozdělení všech tří faktorů',
    'analysis_maintain_balance': 'Udržujte tuto rovnováhu - je to ideální základní přístup',
    'analysis_high_demands': 'Dvě nebo více oblastí má vysoké nároky',
    'analysis_high_risk_failure': 'Velmi vysoké riziko nesplnění termínů nebo překročení rozpočtu',
    'analysis_team_pressure': 'Tým bude pod enormním tlakem, vysoká pravděpodobnost burnoutu',
    'analysis_extreme_time': 'Extrémně vysoké nároky na čas',
    'analysis_time_testing_risk': 'Nedostatek času na testování a debugging',
    'analysis_time_bugs_impact': 'Výsledný produkt může mít skryté chyby a technické dluhy',
    'analysis_time_phases_rec': 'Zvažte rozložení projektu do několika fází',
    'analysis_high_budget': 'Velmi vysoký rozpočet',
    'analysis_budget_roi_risk': 'Obtížné zdůvodnění ROI stakeholderům',
    'analysis_budget_expectations': 'Může vytvořit nerealistická očekávání pro budoucí projekty',
    'analysis_budget_justification': 'Připravte detailní zdůvodnění vysokých nákladů',
    'analysis_extreme_quality': 'Extrémní nároky na kvalitu/rozsah',
    'analysis_quality_perfectionism': 'Nikdy nekončící cyklus úprav a zdokonalování',
    'analysis_quality_never_done': 'Projekt může nikdy nevyhovět všem požadavkům na kvalitu',
    'analysis_quality_criteria': 'Definujte jasná kritéria "hotovo" a držte se jich',
    'analysis_limited_areas': 'Některé oblasti jsou silně omezené',
    'analysis_very_little_time': 'Velmi málo času',
    'analysis_time_design_risk': 'Nedostatek času na kvalitní návrh a implementaci',
    'analysis_time_quick_fixes': 'Tým bude nucen dělat rychlá řešení místo správných řešení',
    'analysis_time_fallback': 'Pripravte si fallback plán s omezenou funkcionalitou',
    'analysis_limited_budget': 'Velmi omezený rozpočet',
    'analysis_budget_unpaid_risk': 'Nutnost spoléhat se na neplacenou práci nebo zdarma nástroje',
    'analysis_budget_expert_limit': 'Omezenéje možnosti najmutí expertů nebo nákupu kvalitních nástrojů',
    'analysis_budget_opensource': 'Hledejte open-source alternativy a využijte existující řešení',
    'analysis_low_quality': 'Velmi nízké nároky na kvalitu',
    'analysis_quality_expectations': 'Výsledek nemusí splnit základní očekávání uživatelů',
    'analysis_quality_reputation': 'Může poškodit reputaci a vyžadovat nákladné opravy později',
    'analysis_quality_minimum': 'Definujte minimální akceptovatelnou úroveň kvality',
    'analysis_speed_low_budget': 'Rychlost při nízkém rozpočtu = pravděpodobné přepracování a chyby',
    'analysis_quality_no_time': 'Vysoká kvalita při málo času = frustrovaný tým a nedodržené termíny',
    'analysis_money_low_quality': 'Vysoký rozpočet s nízkou kvalitou = plýtvání penězi a nespokojení klienti',
    'analysis_urgent_unrealistic': 'URGENTNÍ: Přehodnoťte požadavky projektu - aktuální nastavení je nerealistické',
    'analysis_consider_adjustments': 'Zvažte úpravu některých požadavků pro zvýšení šancí na úspěch',

    // Unicorn project (90-100%) - NOVÁ LOGIKA
    'unicorn_project': '🦄 Projekt "Jednorožec"',
    'unicorn_warning': 'Pozor na průměrný výsledek!',
    'unicorn_description': 'Dosáhli jste téměř perfektního skóre. Pozor ale - projekty s takto vysokým hodnocením často nedělají potřebné kompromisy a výsledek může být paradoxně průměrný.',
    'unicorn_why_average': 'Proč může být výsledek průměrný?',
    'unicorn_reason_no_focus': 'Bez jasných priorit se energie rozptyluje mezi všechny oblasti stejně.',
    'unicorn_reason_no_compromises': 'Nedělání kompromisů často vede k průměrným řešením ve všech oblastech.',
    'unicorn_reason_indecision': 'Příliš vysoké skóre může znamenat nerozhodnost a nechuť k těžkým rozhodnutím.',
    'unicorn_better_approach': 'Lepší přístup',
    'unicorn_recommendation': 'Zvažte snížení jednoho faktoru a soustředění se na oblasti, které jsou pro váš projekt skutečně klíčové.',

    // Balanced approach explanation
    'balanced_approach_title': '⚖️ Co znamená vyvážený přístup?',
    'balanced_approach_desc': 'Vyvážený přístup neznamená "rychle, levně, kvalitně", ale rozumné rozdělení priorit:',
    'balanced_time_meaning': 'Čas (33%): Dostatek času na kvalitní práci, ne rychlost za každou cenu',
    'balanced_budget_meaning': 'Rozpočet (33%): Přiměřené financování, ne minimum nákladů',
    'balanced_quality_meaning': 'Kvalita (33%): Standardní kvalita splňující požadavky, ne maximální možná',
    'balanced_example': 'Příklad: 3 měsíce místo 1 měsíce, 150% základního rozpočtu místo minimálního, důkladné testování místo perfekcionismu.',

    // Factor names for analysis
    'factor_time': 'čas',
    'factor_budget': 'rozpočet',
    'factor_quality': 'kvalita',

    // Badge text
    'tech': 'Tech',
    'creative': 'Creative',
    'construction_industry': 'Construction industry',
    'business': 'Business'
  },
  en: {
    // Header
    'title': 'Project Triangle',
    'subtitle': 'Discover the secrets of successful project management! Interactive visualization shows why you can\'t have a project that\'s fast, cheap, and high-quality at the same time.',
    'interactive_simulator': 'Interactive simulator',
    'practical_examples': 'Practical examples',
    'real_situations': 'Real situations',

    // Tabs
    'simulator_tab': 'Interactive simulator',
    'theory_tab': 'Theory & examples',

    // Simulator
    'simulator_title': '🎮 Interactive project simulator',
    'simulator_description': 'Experiment with individual factors using sliders and watch in real time how changes affect the realism of your project. The red dot in the triangle shows the current position of your project.',
    'how_it_works': 'How does it work?',
    'how_it_works_description': 'Changing one factor affects the other two',

    // Factors
    'time': 'Time',
    'budget': 'Budget',
    'quality': 'Quality/Scope',

    // Factor explanations
    'when_increase_time': 'When you increase time',
    'when_increase_time_desc': 'You can reduce budget or increase quality. More time = less stress and better results.',
    'when_increase_budget': 'When you increase budget',
    'when_increase_budget_desc': 'You can shorten time or increase quality. More money = more people and better tools.',
    'when_increase_quality': 'When you increase quality',
    'when_increase_quality_desc': 'You need more time or budget. Higher quality = more work and care.',

    // Intensity levels
    'minimal': 'Minimal',
    'low': 'Low',
    'standard': 'Standard',
    'high': 'High',
    'maximum': 'Maximum',

    // Sharing
    'share_settings': 'Share current settings',
    'share_settings_desc': 'Copy link with current factor distribution',
    'copy_link': 'Copy link',
    'link_copied': 'Link copied!',
    'link_copied_desc': 'You can share it with others.',
    'copy_failed': 'Failed to copy link',
    'copy_failed_desc': 'Please try again.',

    // Realism
    'project_realism': 'Project realism',
    'current_distribution': 'Current distribution:',
    'total': 'Total:',

    // Realism levels  
    'highly_realistic': 'Highly realistic',
    'realistic_with_compromises': 'Realistic with compromises',
    'problematic': 'Problematic',
    'unrealistic': 'Unrealistic',

    // Realism descriptions
    'highly_realistic_desc': 'This project has good chances of success without major problems.',
    'realistic_with_compromises_desc': 'The project is feasible but will require compromises and careful management.',
    'problematic_desc': 'The project will be very challenging and likely exceed planned frameworks.',
    'unrealistic_desc': 'This project is unrealistic in the given configuration. Consider adjusting requirements.',

    // Detailed analysis
    'why_rating': 'Why the rating is',
    'detailed_analysis': '% - Detailed analysis',
    'reasons_for_rating': 'Reasons for current rating:',
    'main_risks': 'Main risks of this setting:',
    'real_world_impacts': 'What can really happen:',
    'recommendations': 'Recommendations for improvement:',
    'quick_summary': 'Quick summary:',

    // Fallback messages
    'basic_setting_no_reasons': 'Current setting is basic - no specific reasons for evaluation',
    'no_serious_risks': '✅ No serious risks identified with this setting',
    'no_specific_impacts': 'This setting has no specific impacts on project implementation',
    'no_specific_recommendations': '👍 No specific recommendations needed for this setting',

    // Summary messages based on score
    'summary_excellent': 'Your setting is very realistic and has high chances of success. Stick to the plan!',
    'summary_good': 'The project is feasible, but you\'ll need to make compromises. Prepare for challenges.',
    'summary_problematic': 'Current setting is problematic. Seriously consider adjusting requirements.',
    'summary_unrealistic': 'This setting is very unrealistic. You urgently need to reevaluate project priorities.',

    // Theory section
    'what_is_triangle': 'What is the project triangle?',
    'triangle_description': 'The project triangle is a fundamental law of project management that states every project is constrained by three factors - and you can\'t have all three at maximum simultaneously.',
    'triangle_rule': 'Basic rule of the project triangle',
    'triangle_rule_text': '"Fast, cheap, quality - pick two!" You can\'t have all three at maximum simultaneously. If you want all three, you\'ll have to make compromises.',
    'possible_combinations': 'Possible combinations:',
    'fast_cheap': 'Fast + Cheap',
    'fast_quality': 'Fast + Quality',
    'cheap_quality': 'Cheap + Quality',
    'all_three_impossible': 'Fast + Cheap + Quality',
    'lower_quality': 'Lower quality',
    'expensive': 'Expensive',
    'slowly': 'Slowly',
    'impossible': 'Impossible!',

    // Examples
    'practical_examples_title': 'Practical examples from different industries',
    'it_development': 'IT & Software Development',
    'marketing_advertising': 'Marketing & Advertising',
    'construction_industry': 'Construction industry',
    'ecommerce_project': 'E-commerce project',

    // Common situations
    'common_situations': 'Common situations and their solutions',
    'crisis_situation': '"We need it yesterday, but we have no budget"',
    'crisis_desc': 'Common situation in crisis moments. Client wants quick solution for minimum money.',
    'crisis_solution': 'Solution: Offer simplified version of solution (MVP), use existing templates or tools, postpone "nice-to-have" features for later.',
    'unlimited_budget': '"We have a deadline in a month and unlimited budget"',
    'unlimited_budget_desc': 'Situation where time is critical, but money isn\'t a problem.',
    'unlimited_budget_solution': 'Solution: Hire more people, use premium tools and services, work in multiple shifts, buy ready solutions instead of developing custom ones.',
    'quality_focus': '"We want top quality, have small budget, but time isn\'t a problem"',
    'quality_focus_desc': 'Ideal situation for quality work with limited resources.',
    'quality_focus_solution': 'Solution: Careful planning, gradual development, own team, thorough testing, use of open source tools, learning along the way.',

    // Practical tips
    'practical_tips': 'Practical tips for success',
    'before_project': 'Before starting the project:',
    'during_project': 'During implementation:',
    'golden_rule': 'Golden rule',
    'golden_rule_text': 'Rather sacrifice one factor deliberately than fail in all three. Clients appreciate transparency and realistic expectations more than unfulfilled promises.',

    // Footer
    'educational_tool': 'Educational tool',
    'key_features': 'Key features',
    'interactive_simulator_feature': 'Interactive project simulator',
    'practical_examples_feature': 'Practical examples from various industries',
    'real_situations_feature': 'Real situations and their solutions',
    'factor_visualization': 'Visualization of relationships between factors',
    'communicate_clearly': 'Communicate clearly: Always discuss limitations with the team at the beginning of the project',
    'find_balance': 'Find balance: The best projects have balanced distribution of all three factors',
    'modern_web_tech': 'Built with modern web technologies',
    'project_management': 'Project management',
    'interactive': 'Interactive',
    'start_experimenting': 'Start experimenting with the project triangle and discover principles of successful project management',

    // Settings
    'language': 'Language',
    'theme': 'Theme',
    'light': 'Light',
    'dark': 'Dark',
    'system': 'System',

    // Practical examples content
    'fast_cheap_it': 'MVP (Minimum Viable Product) - basic functionality without advanced features. Common in startups.',
    'fast_quality_it': 'Outsourcing senior developers or ready solutions. Expensive but fast and quality.',
    'cheap_quality_it': 'Open source solutions, own team of juniors with mentoring. Takes longer but quality result.',

    'fast_cheap_marketing': 'Templates, stock photos, automated tools. Quick campaign launch with limited originality.',
    'fast_quality_marketing': 'Hiring top creative agency with express rates. Premium quality for premium price.',
    'cheap_quality_marketing': 'Internal team, long creative process, careful testing. Excellent result but takes months.',

    'fast_cheap_construction': 'Prefab houses, basic materials. Quick completion but limited customization options.',
    'fast_quality_construction': 'Multiple shifts, premium materials, experts. Luxury result in record time for high price.',
    'cheap_quality_construction': 'Own work, gradual building, waiting for material discounts. Years of work but great result.',

    'fast_cheap_ecommerce': 'Shopify template, basic payment gateway. Launch in a week but limited customization.',
    'fast_quality_ecommerce': 'Full-time development team, custom solution. Unique e-shop in a month but expensive.',
    'cheap_quality_ecommerce': 'Gradual development by own forces, open source tools. Half year of work but tailored result.',

    // Practical tips content
    'tip_define_priorities': 'Clearly define priorities with client/team',
    'tip_communicate_triangle': 'Communicate the triangle to all stakeholders',
    'tip_prepare_scenarios': 'Prepare "what if" scenarios',
    'tip_document_decisions': 'Document compromises and reasons',
    'tip_evaluate_regularly': 'Regularly evaluate current situation',
    'tip_be_ready_changes': 'Be ready for priority changes',
    'tip_communicate_impacts': 'Communicate impact of changes on other factors',
    'tip_resist_pressure': 'Resist pressure for "everything at once"',

    // Detailed analysis translations
    'analysis_balanced_distribution': 'Balanced distribution of all three factors',
    'analysis_maintain_balance': 'Maintain this balance - it\'s the ideal basic approach',
    'analysis_high_demands': 'Two or more areas have high demands',
    'analysis_high_risk_failure': 'Very high risk of missing deadlines or exceeding budget',
    'analysis_team_pressure': 'Team will be under enormous pressure, high probability of burnout',
    'analysis_extreme_time': 'Extremely high time demands',
    'analysis_time_testing_risk': 'Lack of time for testing and debugging',
    'analysis_time_bugs_impact': 'Final product may have hidden bugs and technical debt',
    'analysis_time_phases_rec': 'Consider breaking the project into several phases',
    'analysis_high_budget': 'Very high budget',
    'analysis_budget_roi_risk': 'Difficult to justify ROI to stakeholders',
    'analysis_budget_expectations': 'May create unrealistic expectations for future projects',
    'analysis_budget_justification': 'Prepare detailed justification for high costs',
    'analysis_extreme_quality': 'Extreme quality/scope demands',
    'analysis_quality_perfectionism': 'Never-ending cycle of improvements and refinements',
    'analysis_quality_never_done': 'Project may never satisfy all quality requirements',
    'analysis_quality_criteria': 'Define clear "done" criteria and stick to them',
    'analysis_limited_areas': 'Some areas are heavily constrained',
    'analysis_very_little_time': 'Very little time',
    'analysis_time_design_risk': 'Lack of time for quality design and implementation',
    'analysis_time_quick_fixes': 'Team will be forced to make quick fixes instead of proper solutions',
    'analysis_time_fallback': 'Prepare a fallback plan with limited functionality',
    'analysis_limited_budget': 'Very limited budget',
    'analysis_budget_unpaid_risk': 'Need to rely on unpaid work or free tools',
    'analysis_budget_expert_limit': 'Limited ability to hire experts or buy quality tools',
    'analysis_budget_opensource': 'Look for open-source alternatives and use existing solutions',
    'analysis_low_quality': 'Very low quality demands',
    'analysis_quality_expectations': 'Result may not meet basic user expectations',
    'analysis_quality_reputation': 'May damage reputation and require expensive fixes later',
    'analysis_quality_minimum': 'Define minimum acceptable quality level',
    'analysis_speed_low_budget': 'Speed with low budget = likely rework and errors',
    'analysis_quality_no_time': 'High quality with little time = frustrated team and missed deadlines',
    'analysis_money_low_quality': 'High budget with low quality = wasting money and unhappy clients',
    'analysis_urgent_unrealistic': 'URGENT: Reevaluate project requirements - current setting is unrealistic',
    'analysis_consider_adjustments': 'Consider adjusting some requirements to increase chances of success',

    // Unicorn project (90-100%) - NEW LOGIC
    'unicorn_project': '🦄 "Unicorn" Project',
    'unicorn_warning': 'Beware of average results!',
    'unicorn_description': 'You\'ve achieved an almost perfect score. Be careful though - projects with such high ratings often don\'t make necessary compromises and the result can be paradoxically average.',
    'unicorn_why_average': 'Why might the result be average?',
    'unicorn_reason_no_focus': 'Without clear priorities, energy is scattered equally across all areas.',
    'unicorn_reason_no_compromises': 'Not making compromises often leads to mediocre solutions in all areas.',
    'unicorn_reason_indecision': 'Too high score may indicate indecision and reluctance to make tough decisions.',
    'unicorn_better_approach': 'Better approach',
    'unicorn_recommendation': 'Consider reducing one factor and focusing on areas that are truly critical for your project.',

    // Balanced approach explanation  
    'balanced_approach_title': '⚖️ What does balanced approach mean?',
    'balanced_approach_desc': 'Balanced approach doesn\'t mean "fast, cheap, quality", but reasonable priority distribution:',
    'balanced_time_meaning': 'Time (33%): Adequate time for quality work, not speed at any cost',
    'balanced_budget_meaning': 'Budget (33%): Reasonable funding, not minimum costs',
    'balanced_quality_meaning': 'Quality (33%): Standard quality meeting requirements, not maximum possible',
    'balanced_example': 'Example: 3 months instead of 1 month, 150% of basic budget instead of minimum, thorough testing instead of perfectionism.',

    // Factor names for analysis
    'factor_time': 'time',
    'factor_budget': 'budget',
    'factor_quality': 'quality',

    // Badge text
    'tech': 'Tech',
    'creative': 'Creative',
    'construction': 'Construction',
    'business': 'Business'
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Safe helpers to avoid SecurityError when storage is blocked (e.g. privacy mode / sandbox)
  const safeGet = (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage ? window.localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  };
  const safeSet = (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage?.setItem(key, value);
    } catch {
      /* ignore */
    }
  };
  // Detekce preferovaného jazyka z prohlížeče
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'cs';
    const saved = safeGet('language');
    if (saved && (saved === 'cs' || saved === 'en')) return saved as Language;
    try {
      const browserLang = navigator.language.toLowerCase();
      return browserLang.startsWith('cs') ? 'cs' : 'en';
    } catch {
      return 'cs';
    }
  };

  // Detekce preferovaného tématu z prohlížeče  
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'system';
    const saved = safeGet('theme');
    if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) return saved as Theme;
    return 'system';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [isDark, setIsDark] = useState(false);

  // Aplikace dark mode na základě tématu
  useEffect(() => {
    const updateTheme = () => {
      let shouldBeDark = false;

      if (theme === 'dark') {
        shouldBeDark = true;
      } else if (theme === 'light') {
        shouldBeDark = false;
      } else {
        // system - detekce systémového nastavení
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      setIsDark(shouldBeDark);

      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateTheme();

    // Poslouchání změn systémového nastavení
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    safeSet('language', lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    safeSet('theme', newTheme);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      theme,
      setTheme,
      isDark,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}