/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

declare module "*.css";

declare global {
	interface Window {
		plausible?: (
			eventName: string,
			options?: {
				props?: Record<string, string | number | boolean>;
				callback?: () => void;
				u?: string;
			}
		) => void;
	}
}

export {};
