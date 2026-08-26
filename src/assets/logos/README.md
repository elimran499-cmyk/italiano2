# Channel logos

Drop a logo file here named after the channel `id` in `src/data/channels.ts`:

    npo-1.png
    rtl-4.svg
    ziggo-select.webp

Accepted: `.png` `.jpg` `.jpeg` `.svg` `.webp`

They are picked up automatically at build time (`import.meta.glob` in
`data/channels.ts`) and rendered by `components/ChannelLogo.tsx`.
Any channel without a matching file falls back to the wordmark tile,
so you can add logos a few at a time.

Note: broadcaster logos are trademarked. Use files you are licensed to use.
