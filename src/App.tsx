import React, { useState } from 'react';
import { Beaker, Sparkles, RotateCcw } from 'lucide-react';

interface ReactionResult {
  product: string;
  description: string;
  color: string;
}

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<ReactionResult | null>(null);

  const elements = [
    { symbol: 'H', name: 'Hydrogen' },
    { symbol: 'O', name: 'Oxygen' },
    { symbol: 'N', name: 'Nitrogen' },
    { symbol: 'C', name: 'Carbon' },
    { symbol: 'Na', name: 'Sodium' },
    { symbol: 'Cl', name: 'Chlorine' },
    { symbol: 'Ca', name: 'Calcium' },
    { symbol: 'Fe', name: 'Iron' },
  ];

  const handleElementClick = (symbol: string) => {
    setSelected((prev) => {
      if (prev.includes(symbol)) {
        return prev.filter((s) => s !== symbol);
      }
      if (prev.length < 2) {
        return [...prev, symbol];
      }
      return [prev[1], symbol];
    });
  };

  const simulateReaction = () => {
    if (selected.length !== 2) return;

    const [elem1, elem2] = selected;
    const key = `${elem1}+${elem2}`;

    const reactions: Record<string, ReactionResult> = {
      'H+O': {
        product: 'H₂O (Water)',
        description: 'Hydrogen and oxygen combine to form water in a spectacular combustion reaction.',
        color: 'from-blue-400 to-blue-600',
      },
      'O+H': {
        product: 'H₂O (Water)',
        description: 'Hydrogen and oxygen combine to form water in a spectacular combustion reaction.',
        color: 'from-blue-400 to-blue-600',
      },
      'Na+Cl': {
        product: 'NaCl (Salt)',
        description: 'Sodium reacts vigorously with chlorine to form table salt.',
        color: 'from-yellow-300 to-orange-500',
      },
      'Cl+Na': {
        product: 'NaCl (Salt)',
        description: 'Sodium reacts vigorously with chlorine to form table salt.',
        color: 'from-yellow-300 to-orange-500',
      },
      'Ca+O': {
        product: 'CaO (Quicklime)',
        description: 'Calcium burns in oxygen to form calcium oxide.',
        color: 'from-red-400 to-red-600',
      },
      'O+Ca': {
        product: 'CaO (Quicklime)',
        description: 'Calcium burns in oxygen to form calcium oxide.',
        color: 'from-red-400 to-red-600',
      },
      'Fe+O': {
        product: 'Fe₂O₃ (Iron Oxide)',
        description: 'Iron rusts when exposed to oxygen.',
        color: 'from-orange-500 to-red-700',
      },
      'O+Fe': {
        product: 'Fe₂O₃ (Iron Oxide)',
        description: 'Iron rusts when exposed to oxygen.',
        color: 'from-orange-500 to-red-700',
      },
    };

    const reactionResult = reactions[key];
    if (reactionResult) {
      setResult(reactionResult);
    } else {
      setResult({
        product: 'No reaction',
        description: 'These elements do not readily react under standard conditions.',
        color: 'from-gray-400 to-gray-600',
      });
    }
  };

  const handleReset = () => {
    setSelected([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="border-b border-purple-500/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Beaker className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Virtual Chemistry Lab</h1>
          </div>
          <p className="text-purple-300">
            Explore chemical reactions and periodic elements interactively
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Select Elements
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {elements.map((element) => (
              <button
                key={element.symbol}
                onClick={() => handleElementClick(element.symbol)}
                className={`p-4 rounded-lg font-semibold text-lg transition-all ${
                  selected.includes(element.symbol)
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400 scale-105'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <div className="text-2xl">{element.symbol}</div>
                <div className="text-xs mt-1">{element.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={simulateReaction}
            disabled={selected.length !== 2}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              selected.length === 2
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Simulate Reaction
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-lg font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {result && (
          <div
            className={`bg-gradient-to-r ${result.color} rounded-lg p-8 text-white animate-pulse`}
          >
            <h3 className="text-2xl font-bold mb-2">{result.product}</h3>
            <p className="text-lg opacity-90">{result.description}</p>
            {selected.length === 2 && (
              <div className="mt-4 text-sm opacity-75">
                Reaction: {selected[0]} + {selected[1]} → {result.product}
              </div>
            )}
          </div>
        )}

        {selected.length < 2 && !result && (
          <div className="bg-slate-800/50 backdrop-blur border border-purple-500/30 rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-4">How to Use</h3>
            <ul className="space-y-2 text-purple-300">
              <li>✓ Select two elements by clicking on them</li>
              <li>✓ Click "Simulate Reaction" to see what happens</li>
              <li>✓ Use "Reset" to start over</li>
              <li>✓ Try different combinations to explore chemistry</li>
            </ul>
          </div>
        )}
      </main>

      <footer className="border-t border-purple-500/30 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-purple-400">
          <p>
            Virtual Chemistry Lab • An interactive educational tool for exploring chemical reactions
          </p>
        </div>
      </footer>
    </div>
  );
}
