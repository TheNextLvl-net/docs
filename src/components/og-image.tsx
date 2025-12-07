const baseUrl =
	import.meta.env.VITE_PUBLIC_BASE_URL || "https://thenextlvl.net";

interface OgImageProps {
	title: string;
	description?: string;
	primaryTextColor?: string;
}

export function OgImage({
	title,
	description,
	primaryTextColor = "rgb(240,240,240)",
}: OgImageProps) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "1200px",
				height: "630px",
				color: "white",
				backgroundColor: "rgb(10,10,10)",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					height: "100%",
					padding: "64px",
					boxSizing: "border-box",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flex: 1,
					}}
				>
					<p
						style={{
							fontWeight: 600,
							fontSize: "76px",
							lineHeight: "1.1",
							margin: 0,
							marginBottom: description ? "24px" : "0",
						}}
					>
						{title}
					</p>
					{description && (
						<p
							style={{
								fontSize: "48px",
								color: "rgba(240,240,240,0.7)",
								lineHeight: "1.2",
								margin: 0,
							}}
						>
							{description}
						</p>
					)}
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: "24px",
						marginTop: "auto",
						color: primaryTextColor,
					}}
				>
					<img
						src={`${baseUrl}/logo.png`}
						style={{
							width: "60px",
							height: "60px",
							objectFit: "contain",
						}}
						alt="Logo"
					/>
					<p
						style={{
							fontSize: "46px",
							fontWeight: 600,
							margin: 0,
						}}
					>
						TheNextLvl
					</p>
				</div>
			</div>
		</div>
	);
}
