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
				width: "100%",
				height: "100%",
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
					padding: "4rem",
				}}
			>
				<p
					style={{
						fontWeight: 600,
						fontSize: "76px",
					}}
				>
					{title}
				</p>
				<p
					style={{
						fontSize: "48px",
						color: "rgba(240,240,240,0.7)",
					}}
				>
					{description}
				</p>
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
						style={{ width: 60, height: 60 }}
						alt="Logo"
					/>
					<p
						style={{
							fontSize: "46px",
							fontWeight: 600,
						}}
					>
						TheNextLvl
					</p>
				</div>
			</div>
		</div>
	);
}
