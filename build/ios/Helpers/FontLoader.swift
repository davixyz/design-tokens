import Foundation
import UIKit

public class FontLoader
{
    /// Store the fonts already loaded
    static var loadedFonts: Dictionary<String, String> = Dictionary<String, String>()

    public static func loadFontIfNeeded(name: String)
    {
        let loadedFont: String? = FontLoader.loadedFonts[name]

        if loadedFont == nil && UIFont(name: name, size: 1) == nil
        {
            FontLoader.loadedFonts[name] = name

            let bundle = Bundle(for: FontLoader.self)
            let fontUrl = bundle.url(forResource: name,
                                     withExtension: "ttf",
                                     subdirectory: "DesignTokensBundle.bundle")
            guard let validFontUrl = fontUrl
                else
            {
                assertionFailure("Failed to create valid font URL")
                return
            }

            guard let data = NSData(contentsOf: validFontUrl)
                else
            {
                assertionFailure("Failed to create NSData")
                return
            }

            guard let dataProvider = CGDataProvider(data: data)
                else
            {
                assertionFailure("Failed to create CGDataProvider")
                return
            }

            guard let font = CGFont(dataProvider)
                else
            {
                assertionFailure("Failed to create CGFont")
                return
            }

            #if DEBUG
            print("loaded font: \(font.fullName ?? "Unknown font.fullName" as CFString)")
            #endif

            var error: Unmanaged<CFError>?
            if !CTFontManagerRegisterGraphicsFont(font, &error)
            {
                let errorDescription = CFErrorCopyDescription(error!.takeUnretainedValue())
                let nsError = error!.takeUnretainedValue() as Any as! Error
                NSException(name: .internalInconsistencyException,
                            reason: errorDescription as String?,
                            userInfo: [NSUnderlyingErrorKey: nsError as Any]).raise()
            }
        }
    }

    #if DEBUG
    public static func printAllLoadedFonts() -> Void
    {
        for family in UIFont.familyNames
        {
            for name in UIFont.fontNames(forFamilyName: family)
            {
                print(name)
            }
        }
    }
    #endif
}
