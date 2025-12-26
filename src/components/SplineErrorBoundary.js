import React from 'react';

class SplineErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Spline 3D Component crashed:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return null; // Return null to simply hide the crashed component
        }

        return this.props.children;
    }
}

export default SplineErrorBoundary;
