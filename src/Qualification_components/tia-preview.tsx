import React, { useState, useEffect } from 'react';
import TiaModalImplementation from './tia-modal-implementation';

/**
 * Simple preview component that renders the TiaModalImplementation
 * This is a standalone page for previewing the new qualification modal
 */
const TiaPreview = () => {
  return (
    <div>
      <TiaModalImplementation />
    </div>
  );
};

export default TiaPreview;