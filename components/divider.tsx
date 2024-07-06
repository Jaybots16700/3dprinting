export function Divider({ className }: { className?: string }) {
	return <div className={`h-px w-full bg-gradient-to-l from-transparent via-blue-500 to-transparent ${className}`} />;
}
