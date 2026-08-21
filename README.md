# Keyreal — האתר

זו הגרסה האמיתית של האתר. קובצי ה־`.dc.html` בשורש הפרויקט הם מוקאפים לתצוגה בלבד.

## הרצה

```bash
cd next
npm install
npm run dev
```

ואז: http://localhost:3000

## מבנה

```
app/
  layout.jsx        shell משותף: פונטים, keyframes, media queries, סקריפט no-flash
  page.jsx          בית (metadata + JSON-LD) → components/LandingView
  plans|contact|blog|legal/page.jsx   server components, metadata לכל עמוד
  sitemap.js robots.js
components/
  SiteShell Header Footer   מותקנים פעם אחת ושורדים ניווט
  LandingView PlansView ContactView BlogView LegalView
  icons.jsx
lib/
  theme.js          שני ה־themes במקום אחד (dark / light)
  site-context.jsx  mode + lang ב־Context, נשמרים ב-localStorage
  i18n.js           עברית היא שפת המקור, EN הוא שכבת תרגום
  landing-data.js posts.js legal-docs.js
public/assets/      תמונות דחוסות
```

## החלטות

- **dark/light ב־state בלבד.** אין קבצים כפולים. `theme.js` מחזיק את שני ה־themes, `SiteShell` מזריק אותם, וההחלפה היא re-render.
- **בלי הבהוב.** סקריפט inline ב־`<head>` קורא את localStorage לפני ה־paint הראשון, כך שהרינדור הראשון כבר בצבע הנכון.
- **ניווט client-side.** `next/link` בלבד — אין טעינת מסמך בין עמודים.
- **SEO.** לכל route יש `metadata` משלו (title, description, canonical, OG), + sitemap ו־robots. עמוד הבית מכיל JSON-LD.
