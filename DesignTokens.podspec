Pod::Spec.new do |s|
  s.name             = 'DesignTokens'
  s.version          = '1.0.0'
  s.author           = { 'Carlos Castro' => 'hello@davixz.com' }
  s.summary          = 'Podspec for Design Tokens'
  s.homepage         = 'https://github.com/davixyz/design-tokens'
  s.platform         = :ios, "10.0"
  s.description      = <<-DESC
Design Tokens for iOS applications
                       DESC

  s.swift_version    = '4.2'
  s.frameworks       = 'UIKit'

  #  Location ##########

  s.source           = { :git => 'https://github.com/davixyz/design-tokens.git', :tag => s.version.to_s }

  #  Contents ###########

  #Local podspecs start
  s.source_files     = ['build/ios/**/*.swift']
  s.resource_bundle  = { 'DesignTokensBundle' => 'build/ios/**/*.{storyboard,xib,xcassets,json,imageset,png,pdf,lproj,otf,ttf}' }
  #Local podspecs end

  #Remote podspecs template start
  #s.vendored_frameworks = 'DesignTokens.framework'
  #s.preserve_paths = 'DesignTokens.framework/*'
  #Remote podspecs template end
end
