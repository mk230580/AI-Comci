import React, { useState } from 'react';
import { MenuIcon, XIcon, BookOpenIcon, GlobeIcon, VideoIcon, ArrowLeftIcon } from './icons';
import { useLocalization } from '../hooks/useLocalization';
import { Language } from '../i18n/locales';

interface HeaderProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
    language: Language;
    setLanguage: (language: Language) => void;
    onShowMangaViewer: () => void;
    onShowWorldview: () => void;
    currentView: 'manga-editor' | 'video-producer';
    onSetView: (view: 'manga-editor' | 'video-producer') => void;
}

export function Header({ isSidebarOpen, onToggleSidebar, language, setLanguage, onShowMangaViewer, onShowWorldview, currentView, onSetView }: HeaderProps): React.ReactElement {
  const { t } = useLocalization();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { key: Language, name: string }[] = [
      { key: 'ko', name: t('korean') },
      { key: 'en', name: t('english') },
      { key: 'ja', name: t('japanese') },
  ];

  return (
    <header className="bg-white border-b border-gray-200 w-full z-20 relative">
      <div className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
            {currentView === 'video-producer' ? (
                <button onClick={() => onSetView('manga-editor')} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 p-2 rounded-md hover:bg-gray-100" title={t('backToEditor')}>
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span className="hidden md:inline">{t('backToEditor')}</span>
                </button>
            ) : (
                <button onClick={onToggleSidebar} className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {isSidebarOpen ? <XIcon className="w-6 h-6 text-gray-700" /> : <MenuIcon className="w-6 h-6 text-gray-700" />}
                </button>
            )}

            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                {currentView === 'video-producer' 
                    ? <VideoIcon className="w-6 h-6 text-white" /> 
                    : <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-5.247-8.995l10.494 0M12 21.747c-5.39-1.393-9.493-6.19-9.493-11.997 0-6.627 5.373-12 12-12s12 5.373 12 12c0 5.807-4.103 10.604-9.493 11.997z"></path></svg>
                }
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                {currentView === 'video-producer' ? t('aiVideoProducer') : t('aiMangaCreator')}
            </h1>
        </div>
        <div className="flex items-center gap-4">
            {currentView === 'manga-editor' && (
                <>
                    <button onClick={() => onSetView('video-producer')} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 p-2 rounded-md hover:bg-gray-100" title={t('aiVideoProducer')}>
                        <VideoIcon className="h-5 w-5" />
                    </button>
                     <button onClick={onShowMangaViewer} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 p-2 rounded-md hover:bg-gray-100" title={t('viewCollection')}>
                        <BookOpenIcon className="h-5 w-5" />
                    </button>
                    <button onClick={onShowWorldview} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 p-2 rounded-md hover:bg-gray-100" title={t('worldviewSettings')}>
                        <GlobeIcon className="h-5 w-5" />
                    </button>
                </>
            )}
            <div className="relative">
                 <button
                    onClick={() => setIsLangOpen(prev => !prev)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 p-2 rounded-md hover:bg-gray-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 2a1 1 0 011.707-.707l3.586 3.586a1 1 0 010 1.414l-3.586 3.586A1 1 0 017 9V5a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1v-4a1 1 0 011-1h2.586l3.707 3.707a1 1 0 01-1.414 1.414L10 14.414V18a1 1 0 01-1 1H7a1 1 0 01-1-1v-2a1 1 0 00-1-1H4a1 1 0 00-1 1v2a3 3 0 003 3h4a1 1 0 00.707-1.707L10 18.586V14.5a1 1 0 011-1h1.293l4.293 4.293a1 1 0 001.414-1.414L14.414 13H16a3 3 0 003-3V7a3 3 0 00-3-3h-4a1 1 0 00-1 1v2.586L9.707 2.293A1 1 0 019 2H7z" clipRule="evenodd" /></svg>
                    <span>{languages.find(l => l.key === language)?.name}</span>
                </button>
                {isLangOpen && (
                    <div className="absolute top-full right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                        {languages.map(({ key, name }) => (
                            <div key={key} onClick={() => { setLanguage(key); setIsLangOpen(false); }} className={`px-4 py-2 text-sm hover:bg-indigo-50 cursor-pointer ${language === key ? 'font-bold text-indigo-600' : 'text-gray-700'}`}>
                                {name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-500 transition-colors text-sm">
              {t('export')}
            </button>
        </div>
      </div>
    </header>
  );
}
