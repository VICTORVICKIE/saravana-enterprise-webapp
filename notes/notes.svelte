<!-- Black -->
:root {
    /* =~= Theme Properties =~= */
    --theme-font-family-base: system-ui;
    --theme-font-family-heading: system-ui;
    --theme-font-color-base: 0 0 0;
    --theme-font-color-dark: 255 255 255;
    --theme-rounded-base: 9999px;
    --theme-rounded-container: 8px;
    --theme-border-base: 1px;
    /* =~= Theme On-X Colors =~= */
    --on-primary: 255 255 255;
    --on-secondary: 255 255 255;
    --on-tertiary: 255 255 255;
    --on-success: 0 0 0;
    --on-warning: 0 0 0;
    --on-error: 0 0 0;
    --on-surface: 255 255 255;
    /* =~= Theme Colors  =~= */
    /* primary | #343232 */
	--color-primary-50: 225 224 224; /* ⬅ #e1e0e0 */
	--color-primary-100: 214 214 214; /* ⬅ #d6d6d6 */
	--color-primary-200: 204 204 204; /* ⬅ #cccccc */
	--color-primary-300: 174 173 173; /* ⬅ #aeadad */
	--color-primary-400: 113 112 112; /* ⬅ #717070 */
	--color-primary-500: 52 50 50; /* ⬅ #343232 */
	--color-primary-600: 47 45 45; /* ⬅ #2f2d2d */
	--color-primary-700: 39 38 38; /* ⬅ #272626 */
	--color-primary-800: 31 30 30; /* ⬅ #1f1e1e */
	--color-primary-900: 25 25 25; /* ⬅ #191919 */
	/* secondary | #343232 */
	--color-secondary-50: 225 224 224; /* ⬅ #e1e0e0 */
	--color-secondary-100: 214 214 214; /* ⬅ #d6d6d6 */
	--color-secondary-200: 204 204 204; /* ⬅ #cccccc */
	--color-secondary-300: 174 173 173; /* ⬅ #aeadad */
	--color-secondary-400: 113 112 112; /* ⬅ #717070 */
	--color-secondary-500: 52 50 50; /* ⬅ #343232 */
	--color-secondary-600: 47 45 45; /* ⬅ #2f2d2d */
	--color-secondary-700: 39 38 38; /* ⬅ #272626 */
	--color-secondary-800: 31 30 30; /* ⬅ #1f1e1e */
	--color-secondary-900: 25 25 25; /* ⬅ #191919 */
	/* tertiary | #343232 */
	--color-tertiary-50: 225 224 224; /* ⬅ #e1e0e0 */
	--color-tertiary-100: 214 214 214; /* ⬅ #d6d6d6 */
	--color-tertiary-200: 204 204 204; /* ⬅ #cccccc */
	--color-tertiary-300: 174 173 173; /* ⬅ #aeadad */
	--color-tertiary-400: 113 112 112; /* ⬅ #717070 */
	--color-tertiary-500: 52 50 50; /* ⬅ #343232 */
	--color-tertiary-600: 47 45 45; /* ⬅ #2f2d2d */
	--color-tertiary-700: 39 38 38; /* ⬅ #272626 */
	--color-tertiary-800: 31 30 30; /* ⬅ #1f1e1e */
	--color-tertiary-900: 25 25 25; /* ⬅ #191919 */
	/* success | #008000 */
	--color-success-50: 217 236 217; /* ⬅ #d9ecd9 */
	--color-success-100: 204 230 204; /* ⬅ #cce6cc */
	--color-success-200: 191 223 191; /* ⬅ #bfdfbf */
	--color-success-300: 153 204 153; /* ⬅ #99cc99 */
	--color-success-400: 77 166 77; /* ⬅ #4da64d */
	--color-success-500: 0 128 0; /* ⬅ #008000 */
	--color-success-600: 0 115 0; /* ⬅ #007300 */
	--color-success-700: 0 96 0; /* ⬅ #006000 */
	--color-success-800: 0 77 0; /* ⬅ #004d00 */
	--color-success-900: 0 63 0; /* ⬅ #003f00 */
	/* warning | #ffff00 */
	--color-warning-50: 255 255 217; /* ⬅ #ffffd9 */
	--color-warning-100: 255 255 204; /* ⬅ #ffffcc */
	--color-warning-200: 255 255 191; /* ⬅ #ffffbf */
	--color-warning-300: 255 255 153; /* ⬅ #ffff99 */
	--color-warning-400: 255 255 77; /* ⬅ #ffff4d */
	--color-warning-500: 255 255 0; /* ⬅ #ffff00 */
	--color-warning-600: 230 230 0; /* ⬅ #e6e600 */
	--color-warning-700: 191 191 0; /* ⬅ #bfbf00 */
	--color-warning-800: 153 153 0; /* ⬅ #999900 */
	--color-warning-900: 125 125 0; /* ⬅ #7d7d00 */
	/* error | #ff0000 */
	--color-error-50: 255 217 217; /* ⬅ #ffd9d9 */
	--color-error-100: 255 204 204; /* ⬅ #ffcccc */
	--color-error-200: 255 191 191; /* ⬅ #ffbfbf */
	--color-error-300: 255 153 153; /* ⬅ #ff9999 */
	--color-error-400: 255 77 77; /* ⬅ #ff4d4d */
	--color-error-500: 255 0 0; /* ⬅ #ff0000 */
	--color-error-600: 230 0 0; /* ⬅ #e60000 */
	--color-error-700: 191 0 0; /* ⬅ #bf0000 */
	--color-error-800: 153 0 0; /* ⬅ #990000 */
	--color-error-900: 125 0 0; /* ⬅ #7d0000 */
	/* surface | #000000 */
	--color-surface-50: 217 217 217; /* ⬅ #d9d9d9 */
	--color-surface-100: 204 204 204; /* ⬅ #cccccc */
	--color-surface-200: 191 191 191; /* ⬅ #bfbfbf */
	--color-surface-300: 153 153 153; /* ⬅ #999999 */
	--color-surface-400: 77 77 77; /* ⬅ #4d4d4d */
	--color-surface-500: 0 0 0; /* ⬅ #000000 */
	--color-surface-600: 0 0 0; /* ⬅ #000000 */
	--color-surface-700: 0 0 0; /* ⬅ #000000 */
	--color-surface-800: 0 0 0; /* ⬅ #000000 */
	--color-surface-900: 0 0 0; /* ⬅ #000000 */
	
}

<!-- Lofi -->


:root {
    /* =~= Theme Properties =~= */
    --theme-font-family-base: system-ui;
    --theme-font-family-heading: system-ui;
    --theme-font-color-base: 0 0 0;
    --theme-font-color-dark: 255 255 255;
    --theme-rounded-base: 9999px;
    --theme-rounded-container: 8px;
    --theme-border-base: 1px;
    /* =~= Theme On-X Colors =~= */
    --on-primary: 255 255 255;
    --on-secondary: 255 255 255;
    --on-tertiary: 255 255 255;
    --on-success: 0 0 0;
    --on-warning: 0 0 0;
    --on-error: 0 0 0;
    --on-surface: 0 0 0;
    /* =~= Theme Colors  =~= */
    /* primary | #0D0D0D */
	--color-primary-50: 219 219 219; /* ⬅ #dbdbdb */
	--color-primary-100: 207 207 207; /* ⬅ #cfcfcf */
	--color-primary-200: 195 195 195; /* ⬅ #c3c3c3 */
	--color-primary-300: 158 158 158; /* ⬅ #9e9e9e */
	--color-primary-400: 86 86 86; /* ⬅ #565656 */
	--color-primary-500: 13 13 13; /* ⬅ #0D0D0D */
	--color-primary-600: 12 12 12; /* ⬅ #0c0c0c */
	--color-primary-700: 10 10 10; /* ⬅ #0a0a0a */
	--color-primary-800: 8 8 8; /* ⬅ #080808 */
	--color-primary-900: 6 6 6; /* ⬅ #060606 */
	/* secondary | #0D0D0D */
	--color-secondary-50: 219 219 219; /* ⬅ #dbdbdb */
	--color-secondary-100: 207 207 207; /* ⬅ #cfcfcf */
	--color-secondary-200: 195 195 195; /* ⬅ #c3c3c3 */
	--color-secondary-300: 158 158 158; /* ⬅ #9e9e9e */
	--color-secondary-400: 86 86 86; /* ⬅ #565656 */
	--color-secondary-500: 13 13 13; /* ⬅ #0D0D0D */
	--color-secondary-600: 12 12 12; /* ⬅ #0c0c0c */
	--color-secondary-700: 10 10 10; /* ⬅ #0a0a0a */
	--color-secondary-800: 8 8 8; /* ⬅ #080808 */
	--color-secondary-900: 6 6 6; /* ⬅ #060606 */
	/* tertiary | #0D0D0D */
	--color-tertiary-50: 219 219 219; /* ⬅ #dbdbdb */
	--color-tertiary-100: 207 207 207; /* ⬅ #cfcfcf */
	--color-tertiary-200: 195 195 195; /* ⬅ #c3c3c3 */
	--color-tertiary-300: 158 158 158; /* ⬅ #9e9e9e */
	--color-tertiary-400: 86 86 86; /* ⬅ #565656 */
	--color-tertiary-500: 13 13 13; /* ⬅ #0D0D0D */
	--color-tertiary-600: 12 12 12; /* ⬅ #0c0c0c */
	--color-tertiary-700: 10 10 10; /* ⬅ #0a0a0a */
	--color-tertiary-800: 8 8 8; /* ⬅ #080808 */
	--color-tertiary-900: 6 6 6; /* ⬅ #060606 */
	/* success | #008000 */
	--color-success-50: 217 236 217; /* ⬅ #d9ecd9 */
	--color-success-100: 204 230 204; /* ⬅ #cce6cc */
	--color-success-200: 191 223 191; /* ⬅ #bfdfbf */
	--color-success-300: 153 204 153; /* ⬅ #99cc99 */
	--color-success-400: 77 166 77; /* ⬅ #4da64d */
	--color-success-500: 0 128 0; /* ⬅ #008000 */
	--color-success-600: 0 115 0; /* ⬅ #007300 */
	--color-success-700: 0 96 0; /* ⬅ #006000 */
	--color-success-800: 0 77 0; /* ⬅ #004d00 */
	--color-success-900: 0 63 0; /* ⬅ #003f00 */
	/* warning | #ffff00 */
	--color-warning-50: 255 255 217; /* ⬅ #ffffd9 */
	--color-warning-100: 255 255 204; /* ⬅ #ffffcc */
	--color-warning-200: 255 255 191; /* ⬅ #ffffbf */
	--color-warning-300: 255 255 153; /* ⬅ #ffff99 */
	--color-warning-400: 255 255 77; /* ⬅ #ffff4d */
	--color-warning-500: 255 255 0; /* ⬅ #ffff00 */
	--color-warning-600: 230 230 0; /* ⬅ #e6e600 */
	--color-warning-700: 191 191 0; /* ⬅ #bfbf00 */
	--color-warning-800: 153 153 0; /* ⬅ #999900 */
	--color-warning-900: 125 125 0; /* ⬅ #7d7d00 */
	/* error | #ff0000 */
	--color-error-50: 255 217 217; /* ⬅ #ffd9d9 */
	--color-error-100: 255 204 204; /* ⬅ #ffcccc */
	--color-error-200: 255 191 191; /* ⬅ #ffbfbf */
	--color-error-300: 255 153 153; /* ⬅ #ff9999 */
	--color-error-400: 255 77 77; /* ⬅ #ff4d4d */
	--color-error-500: 255 0 0; /* ⬅ #ff0000 */
	--color-error-600: 230 0 0; /* ⬅ #e60000 */
	--color-error-700: 191 0 0; /* ⬅ #bf0000 */
	--color-error-800: 153 0 0; /* ⬅ #990000 */
	--color-error-900: 125 0 0; /* ⬅ #7d0000 */
	/* surface | #FFFFFF */
	--color-surface-50: 255 255 255; /* ⬅ #ffffff */
	--color-surface-100: 255 255 255; /* ⬅ #ffffff */
	--color-surface-200: 255 255 255; /* ⬅ #ffffff */
	--color-surface-300: 255 255 255; /* ⬅ #ffffff */
	--color-surface-400: 255 255 255; /* ⬅ #ffffff */
	--color-surface-500: 255 255 255; /* ⬅ #FFFFFF */
	--color-surface-600: 230 230 230; /* ⬅ #e6e6e6 */
	--color-surface-700: 191 191 191; /* ⬅ #bfbfbf */
	--color-surface-800: 153 153 153; /* ⬅ #999999 */
	--color-surface-900: 125 125 125; /* ⬅ #7d7d7d */
	
}