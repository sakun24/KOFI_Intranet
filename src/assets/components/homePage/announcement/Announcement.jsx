import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Announcement.css';

const AnnouncementsList = () => {
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    fetch('http://192.168.123.90/api/announcements')
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => b.id - a.id);
        setLatestAnnouncement(sortedData[0]);
      })
      .catch(error => console.error('Error fetching announcements:', error));
  }, []);

  // Open image preview
  const openImagePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsPreviewOpen(true);
    document.body.classList.add('modal-open'); // Prevent scrolling on the background
  };

  // Close image preview
  const closeImagePreview = () => {
    setIsPreviewOpen(false);
    setPreviewImage('');
    document.body.classList.remove('modal-open'); // Restore background scroll
  };

  // Handle keyboard events, especially for Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isPreviewOpen) {
        closeImagePreview(); // Close on pressing 'Escape'
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); // Cleanup
  }, [isPreviewOpen]);

  return (
    <div className="announcements-list">
      {latestAnnouncement && (
        <motion.div
          className="announcement"
          key={latestAnnouncement.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="announcement-image"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {latestAnnouncement.image && (
              <motion.img
                src={`http://192.168.123.90/imagesAnn/${latestAnnouncement.image}`}
                alt="Announcement"
                onClick={() => openImagePreview(`http://192.168.123.90/imagesAnn/${latestAnnouncement.image}`)}
                style={{ cursor: 'pointer' }} // Keep cursor as pointer for clickable image
              />
            )}
          </motion.div>

          <motion.div
            className="announcement-text"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>HR Announcement</h1>
            <p>
              {latestAnnouncement.text
                .split('\n')
                .filter(line => !line.includes('syun tax') && line.trim() !== '')
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line.replace(/<[^>]+>/g, '')}
                    <br />
                  </React.Fragment>
                ))}
            </p>
          </motion.div>

          {/* Image preview overlay with blur and zoom-in effect */}
          {isPreviewOpen && (
            <motion.div
              className="lightbox-overlay"
              onClick={closeImagePreview}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backdropFilter: 'blur(5px)', // Apply blur to the background
              }}
            >
              <motion.div
                className="lightbox-content"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
              >
                <motion.img
                  src={previewImage}
                  alt="Preview"
                  className="lightbox-image"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AnnouncementsList;
