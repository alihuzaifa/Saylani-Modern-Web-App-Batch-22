# TypeScript Setup — Step by Step

TypeScript ka setup asaan hai. Neeche diye gaye steps ek ek karke follow karein.

---

## Step 1: TypeScript globally install karein

1. Start menu mein **PowerShell** likhein.
2. Us par right click karein aur **Run as Administrator** select karein.
3. Ye command chalayein:

```powershell
npm install -g typescript
```

## Step 2: Agar script disabled ho ya koi error aaye

Agar Step 1 bina kisi error ke chal gaya hai to ye step **skip** kar dein aur seedha Step 3 par jayein.

Agar aapko "running scripts is disabled on this system" jaisa error nazar aaye, to Administrator PowerShell mein ye command chalayein:

```powershell
Set-ExecutionPolicy Unrestricted
```

- Jab poocha jaye to **A** likhein (Yes to All).
- Phir **Enter** dabayein.
- Ab installation command **dobara** chalayein:

```powershell
npm install -g typescript
```

> Note: agar aap zyada mehfooz tareeqa chahte hain to `Unrestricted` ki jagah `RemoteSigned` bhi likh sakte hain. Wo bhi isi tarah kaam karega.

## Step 3: Verify karein

```powershell
tsc -v
```

Agar version number nazar aa jaye (jaise `Version 5.x.x`), to TypeScript install ho chuka hai.

## Step 4: PC restart karein

Ab apna PC **restart** kar lein. Is se environment variables achhi tarah settle ho jate hain aur baad mein koi masla nahi aata.

## Step 5: Naya project banayein

Apne project ka folder banayein, VS Code mein kholein, aur terminal mein chalayein:

```powershell
npx tsc --init
```

Is se aapke folder mein `tsconfig.json` file ban jayegi.

## Step 6: tsconfig.json mein rootDir aur outDir set karein

`tsconfig.json` kholein aur `rootDir` aur `outDir` wali lines dhoondein. In ke aage se `//` hata dein (yani inhein **uncomment** karein) aur path aise likhein:

```json
"rootDir": "./src",
"outDir": "./dist",
```

- **`src`** — yahan aap apni saari `.ts` files banayenge.
- **`dist`** — yahan compiled `.js` files **khud ba khud** ban jayengi. Is folder ko haath lagane ki zaroorat nahi.

## Step 7: Watch mode chalayein

Apni pehli file `src/index.ts` banayein, phir terminal mein **sirf ek dafa** ye command chalayein:

```powershell
npx tsc --w
```

Ab jab bhi aap `.ts` file save karenge, TypeScript usay foran `dist` folder mein `.js` mein badal dega. Is terminal ko khula rehne dein.

## Step 8: HTML file banayein aur compiled JS link karein

Project ke root mein `index.html` banayein aur us mein **compiled** file link karein (`.ts` nahi, `.js`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My TypeScript App</title>
</head>
<body>
  <h1>Hello TypeScript</h1>
  <script src="./dist/index.js"></script>
</body>
</html>
```

> Agar browser console mein `exports is not defined` jaisa error aaye, to `tsconfig.json` mein `"module"` ki value `"es2020"` kar dein aur script tag ko `<script type="module" src="./dist/index.js"></script>` bana dein.

---

## Folder aakhir mein aisa dikhega

```
my-project/
├── src/
│   └── index.ts      <- yahan code likhein
├── dist/
│   └── index.js      <- ye khud banegi
├── index.html
└── tsconfig.json
```
