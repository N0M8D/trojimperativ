import { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertTriangle, Clock, DollarSign, Target, TrendingUp, TrendingDown, Minus, Zap, CheckCircle2, XCircle, AlertCircle, Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from './contexts/AppContext';

interface TriangleState {
  time: number;      // 0-100 (procenta)
  budget: number;    // 0-100 (procenta)
  quality: number;   // 0-100 (procenta)
}

export function ProjectTriangle() {
  const { t, isDark } = useApp();
  
  const [values, setValues] = useState<TriangleState>({
    time: 33.33,
    budget: 33.33,
    quality: 33.34
  });

  const [lastChanged, setLastChanged] = useState<keyof TriangleState | null>(null);

  // Načtení hodnot z URL při načtení komponenty
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const timeParam = urlParams.get('time');
    const budgetParam = urlParams.get('budget');
    const qualityParam = urlParams.get('quality');

    if (timeParam && budgetParam && qualityParam) {
      const time = parseFloat(timeParam);
      const budget = parseFloat(budgetParam);
      const quality = parseFloat(qualityParam);

      if (!isNaN(time) && !isNaN(budget) && !isNaN(quality) &&
          time >= 5 && time <= 90 && budget >= 5 && budget <= 90 && quality >= 5 && quality <= 90) {
        // Inline normalizace pro useEffect
        const sum = time + budget + quality;
        if (sum > 0) {
          setValues({
            time: (time / sum) * 100,
            budget: (budget / sum) * 100,
            quality: (quality / sum) * 100
          });
        }
      }
    }
  }, []);

  // Aktualizace URL při změně hodnot
  const updateURL = useCallback((newValues: TriangleState) => {
    const url = new URL(window.location.href);
    url.searchParams.set('time', newValues.time.toFixed(1));
    url.searchParams.set('budget', newValues.budget.toFixed(1));
    url.searchParams.set('quality', newValues.quality.toFixed(1));
    window.history.replaceState({}, '', url.toString());
  }, []);

  // Funkce pro sdílení aktuálního nastavení
  const shareCurrentSettings = useCallback(async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('time', values.time.toFixed(1));
    url.searchParams.set('budget', values.budget.toFixed(1));
    url.searchParams.set('quality', values.quality.toFixed(1));
    
    try {
      await navigator.clipboard.writeText(url.toString());
      toast.success(t('link_copied'), {
        description: t('link_copied_desc')
      });
    } catch (err) {
      toast.error(t('copy_failed'), {
        description: t('copy_failed_desc')
      });
    }
  }, [values, t]);

  // Normalizace hodnot tak, aby jejich součet byl 100
  const normalizeValues = useCallback((state: TriangleState): TriangleState => {
    const sum = state.time + state.budget + state.quality;
    if (sum === 0) return { time: 33.33, budget: 33.33, quality: 33.34 };
    
    return {
      time: (state.time / sum) * 100,
      budget: (state.budget / sum) * 100,
      quality: (state.quality / sum) * 100
    };
  }, []);

  // Výpočet pozice bodu v trojúhelníku pomocí barycentrických souřadnic
  const calculatePosition = useCallback((state: TriangleState) => {
    const normalized = normalizeValues(state);
    
    const vertices = {
      quality: { x: 200, y: 50 },
      time: { x: 50, y: 300 },
      budget: { x: 350, y: 300 }
    };

    const w1 = normalized.quality / 100;
    const w2 = normalized.time / 100;
    const w3 = normalized.budget / 100;

    const x = w1 * vertices.quality.x + w2 * vertices.time.x + w3 * vertices.budget.x;
    const y = w1 * vertices.quality.y + w2 * vertices.time.y + w3 * vertices.budget.y;

    return { x, y };
  }, [normalizeValues]);

  // Výpočet realističnosti - ideální vyvážení (33.33% každý) = 100%
  const calculateRealism = useCallback((state: TriangleState) => {
    const normalized = normalizeValues(state);
    const ideal = 33.33;
    
    // Základní skóre vyvážeosti (100% pro perfektní rovnováhu)
    const deviation = Math.abs(normalized.time - ideal) + 
                     Math.abs(normalized.budget - ideal) + 
                     Math.abs(normalized.quality - ideal);
    
    // Perfect balance = 100%, postupné snižování s odchylkou
    let balanceScore = Math.max(0, 100 - deviation * 0.8);
    
    // Speciální případy - realistické kombinace
    
    // Perfektní trojimperativ = 100% (tolerance ±1%)
    if (deviation < 3) {
      return 100;
    }
    
    // Penalizace za nerealistické kombinace
    let penalty = 0;
    
    // Všechny tři faktory vysoké (nad 40%) = nerealistické
    if (normalized.time > 40 && normalized.budget > 40 && normalized.quality > 40) {
      penalty += 30;
    }
    
    // Dva faktory velmi vysoké (nad 50%) = velmi problematické
    const veryHighFactors = [normalized.time, normalized.budget, normalized.quality].filter(f => f > 50).length;
    if (veryHighFactors >= 2) {
      penalty += 25;
    }
    
    // Jeden faktor extrémně vysoký (nad 70%) = problém
    const extremeFactors = [normalized.time, normalized.budget, normalized.quality].filter(f => f > 70).length;
    if (extremeFactors >= 1) {
      penalty += 20;
    }
    
    // Jeden faktor velmi nízký (pod 10%) = riziko
    const veryLowFactors = [normalized.time, normalized.budget, normalized.quality].filter(f => f < 10).length;
    if (veryLowFactors >= 1) {
      penalty += 15;
    }
    
    // Bonusy za realistické přístupy
    let bonus = 0;
    
    // Jeden dominantní faktor s rozumnými ostatními
    const dominantFactor = [normalized.time, normalized.budget, normalized.quality].find(f => f >= 45 && f <= 60);
    const otherFactors = [normalized.time, normalized.budget, normalized.quality].filter(f => f !== dominantFactor);
    if (dominantFactor && otherFactors.every(f => f >= 20 && f <= 35)) {
      bonus += 5;
    }
    
    const finalScore = Math.max(0, Math.min(100, balanceScore - penalty + bonus));
    return Math.round(finalScore);
  }, [normalizeValues]);

  const adjustOtherValues = useCallback((changedKey: keyof TriangleState, newValue: number) => {
    setValues(prev => {
      const newState = { ...prev };
      const oldValue = prev[changedKey];
      const difference = newValue - oldValue;
      
      newState[changedKey] = newValue;
      
      const otherKeys = Object.keys(prev).filter(key => key !== changedKey) as (keyof TriangleState)[];
      
      if (otherKeys.length === 2) {
        const reduction = difference / 2;
        otherKeys.forEach(key => {
          newState[key] = Math.max(5, Math.min(90, prev[key] - reduction));
        });
      }
      
      const normalizedState = normalizeValues(newState);
      updateURL(normalizedState);
      return normalizedState;
    });
    setLastChanged(changedKey);
  }, [normalizeValues, updateURL]);

  const position = calculatePosition(values);
  const realismScore = calculateRealism(values);

  const getRealismColor = (score: number) => {
    if (score >= 90) return 'text-purple-500';
    if (score >= 75) return 'text-emerald-500';
    if (score >= 50) return 'text-yellow-500';
    if (score >= 25) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRealismIcon = (score: number) => {
    if (score >= 90) return <span className="text-4xl">🦄</span>;
    if (score >= 75) return <CheckCircle2 className="w-8 h-8" />;
    if (score >= 50) return <AlertCircle className="w-8 h-8" />;
    if (score >= 25) return <AlertTriangle className="w-8 h-8" />;
    return <XCircle className="w-8 h-8" />;
  };

  const getRealismText = (score: number) => {
    if (score >= 90) return t('unicorn_project');
    if (score >= 75) return t('highly_realistic');
    if (score >= 50) return t('realistic_with_compromises');
    if (score >= 25) return t('problematic');
    return t('unrealistic');
  };

  const getRealismDescription = (score: number) => {
    if (score >= 90) return t('unicorn_warning');
    if (score >= 75) return t('highly_realistic_desc');
    if (score >= 50) return t('realistic_with_compromises_desc');
    if (score >= 25) return t('problematic_desc');
    return t('unrealistic_desc');
  };

  const getFactorTrend = (key: keyof TriangleState) => {
    if (lastChanged === key) return <Minus className="w-4 h-4 text-blue-500" />;
    if (lastChanged && lastChanged !== key) {
      const normalized = normalizeValues(values);
      return normalized[key] > 33.33 ? 
        <TrendingUp className="w-4 h-4 text-emerald-500" /> : 
        <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const getIntensityText = (value: number) => {
    if (value < 20) return t('minimal');
    if (value < 35) return t('low');
    if (value < 50) return t('standard');
    if (value < 65) return t('high');
    return t('maximum');
  };

  // Detailní analýza proč je hodnocení takové jaké je
  const getDetailedAnalysis = useCallback((state: TriangleState) => {
    const normalized = normalizeValues(state);
    const score = calculateRealism(state);
    const analysis = {
      reasoning: [] as string[],
      risks: [] as string[],
      recommendations: [] as string[],
      realWorldImpacts: [] as string[]
    };

    // Speciální analýza pro "jednorožce" projekty (90%+) - NOVÁ LOGIKA
    if (score >= 90) {
      analysis.reasoning.push(t('unicorn_description'));
      analysis.risks.push(t('unicorn_reason_no_focus'));
      analysis.risks.push(t('unicorn_reason_no_compromises'));
      analysis.risks.push(t('unicorn_reason_indecision'));
      analysis.recommendations.push(t('unicorn_recommendation'));
      analysis.realWorldImpacts.push(t('unicorn_description'));
      return analysis;
    }

    // Analýza základního rozdělení
    const isBalanced = Math.abs(normalized.time - 33.33) < 10 && 
                      Math.abs(normalized.budget - 33.33) < 10 && 
                      Math.abs(normalized.quality - 33.33) < 10;

    if (isBalanced) {
      analysis.reasoning.push(`${t('analysis_balanced_distribution')} (${Math.round(normalized.time)}%, ${Math.round(normalized.budget)}%, ${Math.round(normalized.quality)}%)`);
      analysis.recommendations.push(t('analysis_maintain_balance'));
    }

    // Analýza extrémních hodnot
    const highFactors = [];
    const lowFactors = [];
    
    if (normalized.time > 50) highFactors.push(t('factor_time'));
    if (normalized.budget > 50) highFactors.push(t('factor_budget'));
    if (normalized.quality > 50) highFactors.push(t('factor_quality'));
    
    if (normalized.time < 20) lowFactors.push(t('factor_time'));
    if (normalized.budget < 20) lowFactors.push(t('factor_budget'));
    if (normalized.quality < 20) lowFactors.push(t('factor_quality'));

    // Vysoké hodnoty
    if (highFactors.length >= 2) {
      analysis.reasoning.push(`${t('analysis_high_demands')} (${highFactors.join(', ')})`);
      analysis.risks.push(t('analysis_high_risk_failure'));
      analysis.realWorldImpacts.push(t('analysis_team_pressure'));
    }

    if (normalized.time > 60) {
      analysis.reasoning.push(`${t('analysis_extreme_time')} (${Math.round(normalized.time)}%)`);
      analysis.risks.push(t('analysis_time_testing_risk'));
      analysis.realWorldImpacts.push(t('analysis_time_bugs_impact'));
      analysis.recommendations.push(t('analysis_time_phases_rec'));
    }

    if (normalized.budget > 60) {
      analysis.reasoning.push(`${t('analysis_high_budget')} (${Math.round(normalized.budget)}%)`);
      analysis.risks.push(t('analysis_budget_roi_risk'));
      analysis.realWorldImpacts.push(t('analysis_budget_expectations'));
      analysis.recommendations.push(t('analysis_budget_justification'));
    }

    if (normalized.quality > 60) {
      analysis.reasoning.push(`${t('analysis_extreme_quality')} (${Math.round(normalized.quality)}%)`);
      analysis.risks.push(t('analysis_quality_perfectionism'));
      analysis.realWorldImpacts.push(t('analysis_quality_never_done'));
      analysis.recommendations.push(t('analysis_quality_criteria'));
    }

    // Nízké hodnoty
    if (lowFactors.length >= 1) {
      analysis.reasoning.push(`${t('analysis_limited_areas')} (${lowFactors.join(', ')})`);
    }

    if (normalized.time < 15) {
      analysis.reasoning.push(`${t('analysis_very_little_time')} (${Math.round(normalized.time)}%)`);
      analysis.risks.push(t('analysis_time_design_risk'));
      analysis.realWorldImpacts.push(t('analysis_time_quick_fixes'));
      analysis.recommendations.push(t('analysis_time_fallback'));
    }

    if (normalized.budget < 15) {
      analysis.reasoning.push(`${t('analysis_limited_budget')} (${Math.round(normalized.budget)}%)`);
      analysis.risks.push(t('analysis_budget_unpaid_risk'));
      analysis.realWorldImpacts.push(t('analysis_budget_expert_limit'));
      analysis.recommendations.push(t('analysis_budget_opensource'));
    }

    if (normalized.quality < 15) {
      analysis.reasoning.push(`${t('analysis_low_quality')} (${Math.round(normalized.quality)}%)`);
      analysis.risks.push(t('analysis_quality_expectations'));
      analysis.realWorldImpacts.push(t('analysis_quality_reputation'));
      analysis.recommendations.push(t('analysis_quality_minimum'));
    }

    // Specifické kombinace
    if (normalized.time > 45 && normalized.budget < 25) {
      analysis.realWorldImpacts.push(t('analysis_speed_low_budget'));
    }

    if (normalized.quality > 45 && normalized.time < 25) {
      analysis.realWorldImpacts.push(t('analysis_quality_no_time'));
    }

    if (normalized.budget > 45 && normalized.quality < 25) {
      analysis.realWorldImpacts.push(t('analysis_money_low_quality'));
    }

    // Doporučení na základě skóre
    if (score < 30) {
      analysis.recommendations.unshift(t('analysis_urgent_unrealistic'));
    } else if (score < 60) {
      analysis.recommendations.unshift(t('analysis_consider_adjustments'));
    }

    return analysis;
  }, [normalizeValues, calculateRealism, t]);

  const detailedAnalysis = getDetailedAnalysis(values);

  return (
    <div className="space-y-8">
      {/* Trojúhelník vizualizace */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`relative overflow-hidden backdrop-blur-sm shadow-2xl transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-800/70 border-gray-700/20' 
            : 'bg-white/70 border-white/20'
        }`}>
          <div className={`absolute inset-0 transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-blue-600/15 via-purple-600/10 to-pink-600/15' 
              : 'bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10'
          }`} />
          <CardContent className="relative p-8">
            <div className="relative">
              <svg viewBox="0 0 400 350" className="w-full max-w-lg mx-auto">
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                    <stop offset="50%" stopColor="rgba(147, 51, 234, 0.08)" />
                    <stop offset="100%" stopColor="rgba(236, 72, 153, 0.1)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Hlavní trojúhelník */}
                <polygon 
                  points="200,50 350,300 50,300" 
                  fill="url(#triangleGradient)" 
                  stroke="url(#triangleGradient)" 
                  strokeWidth="3"
                  filter="url(#glow)"
                />
                
                {/* Modernější mřížka */}
                <g stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" strokeDasharray="2,2">
                  <line x1="75" y1="275" x2="325" y2="275" />
                  <line x1="100" y1="250" x2="300" y2="250" />
                  <line x1="125" y1="225" x2="275" y2="225" />
                  <line x1="150" y1="200" x2="250" y2="200" />
                  <line x1="175" y1="175" x2="225" y2="175" />
                  
                  <line x1="200" y1="50" x2="125" y2="225" />
                  <line x1="200" y1="50" x2="275" y2="225" />
                  <line x1="75" y1="275" x2="250" y2="200" />
                  <line x1="325" y1="275" x2="150" y2="200" />
                </g>
                
                {/* Vrcholy s moderním designem */}
                <circle cx="200" cy="50" r="10" fill="rgb(59 130 246)" className="drop-shadow-lg" />
                <text x="200" y="35" textAnchor="middle" className={`text-sm font-medium ${
                  isDark ? 'fill-blue-400' : 'fill-blue-600'
                }`}>{t('quality')}</text>
                
                <circle cx="50" cy="300" r="10" fill="rgb(16 185 129)" className="drop-shadow-lg" />
                <text x="50" y="325" textAnchor="middle" className={`text-sm font-medium ${
                  isDark ? 'fill-emerald-400' : 'fill-emerald-600'
                }`}>{t('time')}</text>
                
                <circle cx="350" cy="300" r="10" fill="rgb(245 158 11)" className="drop-shadow-lg" />
                <text x="350" y="325" textAnchor="middle" className={`text-sm font-medium ${
                  isDark ? 'fill-amber-400' : 'fill-amber-600'
                }`}>{t('budget')}</text>
                
                {/* Animovaný projektový bod */}
                <motion.circle 
                  cx={position.x} 
                  cy={position.y}
                  r="10" 
                  fill="rgb(239 68 68)"
                  stroke="white"
                  strokeWidth="3"
                  className="drop-shadow-xl"
                  animate={{ 
                    cx: position.x, 
                    cy: position.y,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    cx: { duration: 0.3 },
                    cy: { duration: 0.3 },
                    scale: { duration: 0.2 }
                  }}
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modernější ovládání */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Čas */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className={`relative overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-700/50' 
              : 'bg-gradient-to-br from-emerald-50/80 to-green-50/80 border-emerald-200/50'
          }`}>
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-br from-emerald-600/10 to-green-600/10' 
                : 'bg-gradient-to-br from-emerald-500/5 to-green-500/5'
            }`} />
            <CardHeader className="relative pb-3">
              <CardTitle className={`flex items-center gap-2 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                <Clock className="w-5 h-5" />
                {t('time')}
                {getFactorTrend('time')}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <Slider
                  value={[values.time]}
                  onValueChange={(value) => adjustOtherValues('time', value[0])}
                  max={90}
                  min={5}
                  step={1}
                  className="w-full"
                />
                <div className="text-center">
                  <Badge variant="secondary" className={`text-lg px-4 py-2 ${
                    isDark 
                      ? 'bg-emerald-800/50 text-emerald-300 border-emerald-600/50' 
                      : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                  }`}>
                    {Math.round(values.time)}%
                  </Badge>
                </div>
                <p className={`text-sm text-center font-medium ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {getIntensityText(values.time)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rozpočet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className={`relative overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-amber-700/50' 
              : 'bg-gradient-to-br from-amber-50/80 to-yellow-50/80 border-amber-200/50'
          }`}>
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-br from-amber-600/10 to-yellow-600/10' 
                : 'bg-gradient-to-br from-amber-500/5 to-yellow-500/5'
            }`} />
            <CardHeader className="relative pb-3">
              <CardTitle className={`flex items-center gap-2 ${
                isDark ? 'text-amber-400' : 'text-amber-600'
              }`}>
                <DollarSign className="w-5 h-5" />
                {t('budget')}
                {getFactorTrend('budget')}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <Slider
                  value={[values.budget]}
                  onValueChange={(value) => adjustOtherValues('budget', value[0])}
                  max={90}
                  min={5}
                  step={1}
                  className="w-full"
                />
                <div className="text-center">
                  <Badge variant="secondary" className={`text-lg px-4 py-2 ${
                    isDark 
                      ? 'bg-amber-800/50 text-amber-300 border-amber-600/50' 
                      : 'bg-amber-100 text-amber-700 border-amber-300'
                  }`}>
                    {Math.round(values.budget)}%
                  </Badge>
                </div>
                <p className={`text-sm text-center font-medium ${
                  isDark ? 'text-amber-400' : 'text-amber-600'
                }`}>
                  {getIntensityText(values.budget)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Kvalita/Rozsah */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className={`relative overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-700/50' 
              : 'bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border-blue-200/50'
          }`}>
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-br from-blue-600/10 to-indigo-600/10' 
                : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'
            }`} />
            <CardHeader className="relative pb-3">
              <CardTitle className={`flex items-center gap-2 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                <Target className="w-5 h-5" />
                {t('quality')}
                {getFactorTrend('quality')}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                <Slider
                  value={[values.quality]}
                  onValueChange={(value) => adjustOtherValues('quality', value[0])}
                  max={90}
                  min={5}
                  step={1}
                  className="w-full"
                />
                <div className="text-center">
                  <Badge variant="secondary" className={`text-lg px-4 py-2 ${
                    isDark 
                      ? 'bg-blue-800/50 text-blue-300 border-blue-600/50' 
                      : 'bg-blue-100 text-blue-700 border-blue-300'
                  }`}>
                    {Math.round(values.quality)}%
                  </Badge>
                </div>
                <p className={`text-sm text-center font-medium ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {getIntensityText(values.quality)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Sdílení nastavení */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className={`relative overflow-hidden backdrop-blur-sm shadow-lg transition-colors duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-700/50' 
            : 'bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border-indigo-200/50'
        }`}>
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-indigo-600/10 to-purple-600/10' 
              : 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5'
          }`} />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Share2 className={`w-5 h-5 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`} />
                <div>
                  <h4 className={`font-medium ${
                    isDark ? 'text-indigo-300' : 'text-indigo-800'
                  }`}>{t('share_settings')}</h4>
                  <p className={`text-sm ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                  }`}>{t('share_settings_desc')}</p>
                </div>
              </div>
              <Button
                onClick={shareCurrentSettings}
                variant="outline"
                size="sm"
                className={`transition-colors duration-300 ${
                  isDark 
                    ? 'bg-gray-800/50 border-indigo-600/50 text-indigo-400 hover:bg-indigo-800/50' 
                    : 'bg-white/50 border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                }`}
              >
                <Copy className="w-4 h-4 mr-2" />
                {t('copy_link')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Zhodnocení realističnosti */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className={`relative overflow-hidden backdrop-blur-sm shadow-xl transition-colors duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50' 
            : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50'
        }`}>
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10' 
              : 'bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5'
          }`} />
          <CardContent className="relative p-8">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div className="flex items-center justify-center gap-6">
                <motion.div
                  className={getRealismColor(realismScore)}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {getRealismIcon(realismScore)}
                </motion.div>
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className={`w-5 h-5 ${
                      isDark ? 'text-purple-400' : 'text-purple-500'
                    }`} />
                    <h3 className={`text-xl ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>{t('project_realism')}</h3>
                  </div>
                  <motion.div 
                    className={`text-4xl ${getRealismColor(realismScore)}`}
                    key={realismScore}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {realismScore}%
                  </motion.div>
                  <p className={`${getRealismColor(realismScore)} font-medium`}>
                    {getRealismText(realismScore)}
                  </p>
                  <p className={`text-sm mt-2 max-w-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {getRealismDescription(realismScore)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className={`text-lg font-medium ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>{t('current_distribution')}</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                    <span className={`font-medium ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>{t('time')}:</span>
                    <span className={`ml-auto font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>{Math.round(values.time)}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                    <span className={`font-medium ${
                      isDark ? 'text-amber-400' : 'text-amber-600'
                    }`}>{t('budget')}:</span>
                    <span className={`ml-auto font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>{Math.round(values.budget)}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className={`font-medium ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>{t('quality')}:</span>
                    <span className={`ml-auto font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>{Math.round(values.quality)}%</span>
                  </div>
                  <div className={`flex items-center gap-3 border-t pt-3 ${
                    isDark ? 'border-gray-600' : 'border-gray-300'
                  }`}>
                    <span className={`font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>{t('total')}:</span>
                    <span className={`ml-auto font-medium ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>{Math.round(values.time + values.budget + values.quality)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Speciální sekce pro "jednorožce" projekty - NOVÁ LOGIKA */}
      {realismScore >= 90 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className={`relative overflow-hidden backdrop-blur-sm shadow-xl border-2 transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50' 
              : 'bg-gradient-to-br from-purple-50/80 to-pink-50/80 border-purple-300/50'
          }`}>
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-br from-purple-600/20 via-pink-600/15 to-purple-600/20' 
                : 'bg-gradient-to-br from-purple-500/10 via-pink-500/8 to-purple-500/10'
            }`} />
            <CardHeader className="relative text-center">
              <CardTitle className={`flex items-center justify-center gap-3 text-2xl ${
                isDark ? 'text-purple-300' : 'text-purple-700'
              }`}>
                <span className="text-3xl">🦄</span>
                {t('unicorn_project')}
                <span className="text-3xl">🦄</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-6">
              <div className="text-center">
                <p className={`text-xl mb-4 ${
                  isDark ? 'text-purple-200' : 'text-purple-800'
                }`}>
                  <strong>{t('unicorn_warning')}</strong>
                </p>
                <p className={`text-lg max-w-2xl mx-auto ${
                  isDark ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  {t('unicorn_description')}
                </p>
              </div>

              <div className={`p-6 rounded-xl border ${
                isDark 
                  ? 'bg-purple-900/20 border-purple-700/50' 
                  : 'bg-purple-100/50 border-purple-300'
              }`}>
                <h4 className={`font-semibold mb-4 flex items-center gap-2 ${
                  isDark ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  <AlertCircle className="w-5 h-5" />
                  {t('unicorn_why_average')}
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className={`mt-1 ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    }`}>🎯</span>
                    <span className={`${
                      isDark ? 'text-purple-200' : 'text-purple-800'
                    }`}>{t('unicorn_reason_no_focus')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`mt-1 ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    }`}>⚖️</span>
                    <span className={`${
                      isDark ? 'text-purple-200' : 'text-purple-800'
                    }`}>{t('unicorn_reason_no_compromises')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`mt-1 ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    }`}>❓</span>
                    <span className={`${
                      isDark ? 'text-purple-200' : 'text-purple-800'
                    }`}>{t('unicorn_reason_indecision')}</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <h4 className={`font-semibold mb-3 ${
                  isDark ? 'text-purple-300' : 'text-purple-700'
                }`}>{t('unicorn_better_approach')}</h4>
                <p className={`${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>{t('unicorn_recommendation')}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Vysvětlení vyváženého přístupu */}
      {realismScore >= 70 && realismScore < 90 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className={`relative overflow-hidden backdrop-blur-sm shadow-lg transition-colors duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-700/50' 
              : 'bg-gradient-to-br from-emerald-50/80 to-green-50/80 border-emerald-200/50'
          }`}>
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-br from-emerald-600/10 to-green-600/10' 
                : 'bg-gradient-to-br from-emerald-500/8 to-green-500/8'
            }`} />
            <CardHeader className="relative">
              <CardTitle className={`flex items-center gap-2 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                <span className="text-xl">⚖️</span>
                {t('balanced_approach_title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className={`${
                isDark ? 'text-emerald-300' : 'text-emerald-700'
              }`}>
                {t('balanced_approach_desc')}
              </p>
              
              <div className="grid gap-3 md:grid-cols-3">
                <div className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-emerald-900/20 border-emerald-700/50' 
                    : 'bg-emerald-100/50 border-emerald-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⏰</span>
                    <strong className={isDark ? 'text-emerald-300' : 'text-emerald-700'}>
                      {t('time')}
                    </strong>
                  </div>
                  <p className={`text-sm ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {t('balanced_time_meaning')}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-emerald-900/20 border-emerald-700/50' 
                    : 'bg-emerald-100/50 border-emerald-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💰</span>
                    <strong className={isDark ? 'text-emerald-300' : 'text-emerald-700'}>
                      {t('budget')}
                    </strong>
                  </div>
                  <p className={`text-sm ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {t('balanced_budget_meaning')}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border ${
                  isDark 
                    ? 'bg-emerald-900/20 border-emerald-700/50' 
                    : 'bg-emerald-100/50 border-emerald-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎯</span>
                    <strong className={isDark ? 'text-emerald-300' : 'text-emerald-700'}>
                      {t('quality')}
                    </strong>
                  </div>
                  <p className={`text-sm ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {t('balanced_quality_meaning')}
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                isDark 
                  ? 'bg-emerald-800/20 border-emerald-600/50' 
                  : 'bg-emerald-50 border-emerald-200'
              }`}>
                <p className={`text-sm italic ${
                  isDark ? 'text-emerald-300' : 'text-emerald-700'
                }`}>
                  <strong>💡 {t('balanced_example')}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Detailní analýza a vysvětlení hodnocení */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className={`relative overflow-hidden backdrop-blur-sm shadow-lg transition-colors duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-800/80 to-blue-900/80 border-slate-700/50' 
            : 'bg-gradient-to-br from-slate-50/80 to-blue-50/80 border-slate-200/50'
        }`}>
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-slate-600/10 via-blue-600/10 to-indigo-600/10' 
              : 'bg-gradient-to-br from-slate-500/5 via-blue-500/5 to-indigo-500/5'
          }`} />
          <CardHeader className="relative">
            <CardTitle className={`flex items-center gap-2 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <AlertCircle className="w-6 h-6" />
              {t('why_rating')} {realismScore}{t('detailed_analysis')}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative min-h-[800px]">
            {/* Speciální zobrazení pro "jednorožce" */}
            {realismScore >= 90 ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🦄</div>
                  <h3 className={`text-2xl mb-4 ${
                    isDark ? 'text-purple-300' : 'text-purple-700'
                  }`}>{t('unicorn_project')}</h3>
                  <p className={`text-lg ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`}>{t('unicorn_description')}</p>
                </div>
                
                <div className={`p-6 rounded-xl border ${
                  isDark 
                    ? 'bg-purple-900/20 border-purple-700/50' 
                    : 'bg-purple-100/50 border-purple-300'
                }`}>
                  <h4 className={`font-semibold mb-4 ${
                    isDark ? 'text-purple-300' : 'text-purple-700'
                  }`}>{t('unicorn_why_average')}</h4>
                  <div className="space-y-3">
                    {detailedAnalysis.risks.map((risk, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className={`mt-0.5 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}>⚠️</span>
                        <span className={`text-sm ${
                          isDark ? 'text-purple-300' : 'text-purple-700'
                        }`}>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <p className={`text-lg ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`}>{t('unicorn_recommendation')}</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2 h-full">
              
                {/* Levý sloupec - Analýza a rizika */}
                <div className="space-y-6">
                  {/* Důvody hodnocení */}
                  <div className="min-h-[180px]">
                    <h4 className={`font-semibold flex items-center gap-2 mb-3 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      <Target className="w-4 h-4" />
                      {t('reasons_for_rating')}
                    </h4>
                    <div className="space-y-2 min-h-[140px]">
                      {detailedAnalysis.reasoning.length > 0 ? (
                        detailedAnalysis.reasoning.map((reason, index) => (
                          <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${
                            isDark ? 'bg-slate-700/50' : 'bg-slate-100/50'
                          }`}>
                            <span className={`mt-0.5 ${
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            }`}>📊</span>
                            <span className={`text-sm ${
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }`}>{reason}</span>
                          </div>
                        ))
                      ) : (
                        <div className={`flex items-center justify-center min-h-[140px] text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {t('basic_setting_no_reasons')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rizika */}
                  <div className="min-h-[200px]">
                    <h4 className={`font-semibold flex items-center gap-2 mb-3 ${
                      isDark ? 'text-red-400' : 'text-red-700'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                      {t('main_risks')}
                    </h4>
                    <div className="space-y-2 min-h-[160px]">
                      {detailedAnalysis.risks.length > 0 ? (
                        detailedAnalysis.risks.map((risk, index) => (
                          <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-red-900/30 border-red-700/50' 
                              : 'bg-red-50/50 border-red-200/50'
                          }`}>
                            <span className={`mt-0.5 ${
                              isDark ? 'text-red-400' : 'text-red-500'
                            }`}>⚠️</span>
                            <span className={`text-sm ${
                              isDark ? 'text-red-300' : 'text-red-700'
                            }`}>{risk}</span>
                          </div>
                        ))
                      ) : (
                        <div className={`flex items-center justify-center min-h-[160px] text-sm ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}>
                          {t('no_serious_risks')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pravý sloupec - Dopady a doporučení */}
                <div className="space-y-6">
                  {/* Co se může stát v reálném světě */}
                  <div className="min-h-[180px]">
                    <h4 className={`font-semibold flex items-center gap-2 mb-3 ${
                      isDark ? 'text-orange-400' : 'text-orange-700'
                    }`}>
                      <AlertCircle className="w-4 h-4" />
                      {t('real_world_impacts')}
                    </h4>
                    <div className="space-y-2 min-h-[140px]">
                      {detailedAnalysis.realWorldImpacts.length > 0 ? (
                        detailedAnalysis.realWorldImpacts.map((impact, index) => (
                          <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-orange-900/30 border-orange-700/50' 
                              : 'bg-orange-50/50 border-orange-200/50'
                          }`}>
                            <span className={`mt-0.5 ${
                              isDark ? 'text-orange-400' : 'text-orange-500'
                            }`}>🌍</span>
                            <span className={`text-sm ${
                              isDark ? 'text-orange-300' : 'text-orange-700'
                            }`}>{impact}</span>
                          </div>
                        ))
                      ) : (
                        <div className={`flex items-center justify-center min-h-[140px] text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {t('no_specific_impacts')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doporučení */}
                  <div className="min-h-[200px]">
                    <h4 className={`font-semibold flex items-center gap-2 mb-3 ${
                      isDark ? 'text-green-400' : 'text-green-700'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                      {t('recommendations')}
                    </h4>
                    <div className="space-y-2 min-h-[160px]">
                      {detailedAnalysis.recommendations.length > 0 ? (
                        detailedAnalysis.recommendations.map((recommendation, index) => (
                          <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${
                            isDark 
                              ? 'bg-green-900/30 border-green-700/50' 
                              : 'bg-green-50/50 border-green-200/50'
                          }`}>
                            <span className={`mt-0.5 ${
                              isDark ? 'text-green-400' : 'text-green-500'
                            }`}>💡</span>
                            <span className={`text-sm ${
                              isDark ? 'text-green-300' : 'text-green-700'
                            }`}>{recommendation}</span>
                          </div>
                        ))
                      ) : (
                        <div className={`flex items-center justify-center min-h-[160px] text-sm ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}>
                          {t('no_specific_recommendations')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rychlé shrnutí - plná šířka dole */}
            {realismScore < 90 && (
              <div className={`mt-6 p-4 rounded-lg border ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-blue-700/50' 
                  : 'bg-gradient-to-r from-blue-100/50 to-indigo-100/50 border-blue-200/50'
              }`}>
                <h5 className={`font-semibold mb-2 flex items-center gap-2 ${
                  isDark ? 'text-blue-400' : 'text-blue-800'
                }`}>
                  <Zap className="w-4 h-4" />
                  {t('quick_summary')}
                </h5>
                <p className={`text-sm ${
                  isDark ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  {realismScore >= 75 
                    ? t('summary_excellent')
                    : realismScore >= 50
                    ? t('summary_good')
                    : realismScore >= 25
                    ? t('summary_problematic')
                    : t('summary_unrealistic')
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}