'use client';

import React from 'react';

export default class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Section Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-24 text-center text-text-secondary">
          <p>Something went wrong loading this section.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
