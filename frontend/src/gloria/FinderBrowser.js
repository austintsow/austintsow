import React, { useState, useEffect, useMemo } from 'react';
import './FinderBrowser.css';
import FileIcon from './components/FileIcon';
import PhotoLightbox from './components/PhotoLightbox';
import ReadmeModal from './components/ReadmeModal';

const FinderBrowser = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [viewingReadme, setViewingReadme] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isExiting, setIsExiting] = useState(false);

  const files = [
    {
      name: 'puzzle-night.jpeg',
      type: 'JPEG image',
      size: '236 KB',
      dateModified: 'Dec 27, 2025',
      dateValue: new Date('2025-12-27'),
      sizeValue: 236,
      path: '/images/gallery/puzzle-night.jpeg',
      isImage: true
    },
    {
      name: 'crumbl.jpeg',
      type: 'JPEG image',
      size: '176 KB',
      dateModified: 'Dec 21, 2025',
      dateValue: new Date('2025-12-21'),
      sizeValue: 176,
      path: '/images/gallery/crumbl.jpeg',
      isImage: true
    },
    {
      name: 'clubbing.jpeg',
      type: 'JPEG image',
      size: '180 KB',
      dateModified: 'Aug 2, 2025',
      dateValue: new Date('2025-08-02'),
      sizeValue: 180,
      path: '/images/gallery/clubbing.jpeg',
      isImage: true
    },
    {
      name: 'emeryville.jpeg',
      type: 'JPEG image',
      size: '341 KB',
      dateModified: 'Nov 23, 2025',
      dateValue: new Date('2025-11-23'),
      sizeValue: 341,
      path: '/images/gallery/emeryville.jpeg',
      isImage: true
    },
    {
      name: 'backshot.jpeg',
      type: 'JPEG image',
      size: '480 KB',
      dateModified: 'Feb 7, 2026',
      dateValue: new Date('2026-02-07'),
      sizeValue: 480,
      path: '/images/gallery/backshot.jpeg',
      isImage: true
    },
    {
      name: 'README.md',
      type: 'Markdown Document',
      size: '2 KB',
      dateModified: 'Feb 7, 2026',
      dateValue: new Date('2026-02-07'),
      sizeValue: 2,
      path: null,
      isImage: false
    }
  ];

  // Sorting logic
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedFiles = useMemo(() => {
    return [...files].sort((a, b) => {
      let compareA, compareB;

      switch (sortBy) {
        case 'name':
          compareA = a.name.toLowerCase();
          compareB = b.name.toLowerCase();
          break;
        case 'date':
          compareA = a.dateValue;
          compareB = b.dateValue;
          break;
        case 'size':
          compareA = a.sizeValue;
          compareB = b.sizeValue;
          break;
        case 'kind':
          compareA = a.type.toLowerCase();
          compareB = b.type.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder]);

  // Single-click to open file
  const handleFileClick = (file) => {
    setSelectedFile(file.name);
    if (file.isImage) {
      setViewingPhoto(file);
    } else {
      setViewingReadme(true);
    }
  };

  // Close with animation
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && !viewingPhoto && !viewingReadme) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewingPhoto, viewingReadme]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewingPhoto || viewingReadme) return;

      const currentIndex = sortedFiles.findIndex(f => f.name === selectedFile);

      if (e.key === 'ArrowDown' && currentIndex < sortedFiles.length - 1) {
        e.preventDefault();
        setSelectedFile(sortedFiles[currentIndex + 1].name);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        setSelectedFile(sortedFiles[currentIndex - 1].name);
      } else if (e.key === 'Enter' && selectedFile) {
        e.preventDefault();
        const file = sortedFiles.find(f => f.name === selectedFile);
        handleFileClick(file);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFile, sortedFiles, viewingPhoto, viewingReadme]);

  const getSortIndicator = (column) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div className={`finder-overlay ${isExiting ? 'exiting' : ''}`}>
      <div className="finder-window">
        {/* Title Bar */}
        <div className="finder-titlebar">
          <div className="traffic-lights">
            <span className="light close" onClick={handleClose}></span>
            <span className="light minimize"></span>
            <span className="light maximize"></span>
          </div>
          <div className="window-title">my-favorite</div>
        </div>

        {/* Toolbar */}
        <div className="finder-toolbar">
          <div className="folder-path">
            <svg className="folder-icon-small" width="20" height="20" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="folderGradientSmall" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#6FC7EA', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#3F9FD9', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path
                d="M10 30 C10 25 12 20 17 20 L45 20 L55 30 L103 30 C108 30 110 32 110 37 L110 95 C110 100 108 105 103 105 L17 105 C12 105 10 100 10 95 Z"
                fill="url(#folderGradientSmall)"
                stroke="#2E7A9F"
                strokeWidth="2"
              />
            </svg>
            <span>my-favorite</span>
          </div>
        </div>

        {/* File List Table */}
        <div className="finder-content">
          <table className="file-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>Name{getSortIndicator('name')}</th>
                <th onClick={() => handleSort('date')}>Date Modified{getSortIndicator('date')}</th>
                <th onClick={() => handleSort('size')}>Size{getSortIndicator('size')}</th>
                <th onClick={() => handleSort('kind')}>Kind{getSortIndicator('kind')}</th>
              </tr>
            </thead>
            <tbody>
              {sortedFiles.map(file => (
                <tr
                  key={file.name}
                  className={selectedFile === file.name ? 'selected' : ''}
                  onClick={() => handleFileClick(file)}
                >
                  <td className="name-cell">
                    <FileIcon type={file.type} thumbnail={file.path} />
                    <span>{file.name}</span>
                  </td>
                  <td>{file.dateModified}</td>
                  <td className="size-cell">{file.size}</td>
                  <td className="kind-cell">{file.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Photo Lightbox */}
      {viewingPhoto && (
        <PhotoLightbox
          photo={viewingPhoto}
          photos={sortedFiles.filter(f => f.isImage)}
          onClose={() => setViewingPhoto(null)}
          onNavigate={(newPhoto) => setViewingPhoto(newPhoto)}
        />
      )}

      {/* README Modal */}
      {viewingReadme && (
        <ReadmeModal onClose={() => setViewingReadme(false)} />
      )}
    </div>
  );
};

export default FinderBrowser;
