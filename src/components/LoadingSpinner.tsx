const LoadingSpinner = () => {
	return (
		<div className="flex flex-col items-center justify-center py-6">
			<div className="h-6 w-6 rounded-full border-2 border-neutral-200 border-t-2 border-t-emerald-500 animate-spin" />
			<p className="mt-2 text-neutral-400 text-sm">Loading...</p>
		</div>
	);
};

export default LoadingSpinner;
